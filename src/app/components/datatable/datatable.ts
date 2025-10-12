import {
  Component,
  computed,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  Input,
  Output,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { Button } from '../button/button';
import { PopOver } from '../popover/popover';
import { isISODate } from '../../shared/services/helpers.service';
import { Select, SelectOption } from '../select/select';

export type Columns = Record<
  string,
  {
    label: string;
    transform?: (value: unknown) => string;
    sort?: boolean;
  }
>;
export type Data = Record<string, string | number>;

export interface LoadItems {
  start: number;
  end: number;
}

@Component({
  selector: 'app-datatable',
  imports: [PopOver, Button, Select],
  templateUrl: './datatable.html',
  styleUrl: './datatable.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  encapsulation: ViewEncapsulation.None,
})
export class DataTable {
  @Input({ required: true }) columns: Columns = {};
  @Input({ required: true }) data: Data[] = [];
  @Input({ required: true }) total = 0;
  @Input({ required: true, transform: (val: string) => val.trim() }) idCol!: string;
  @Input({ required: true }) defaultSortCol = 'updatedAt';

  @Output() getMore = new EventEmitter<LoadItems>();

  itemsPerPage = signal(25);
  page = signal(1);
  sorting = signal({ col: this.defaultSortCol, asc: true });

  pageTotal = computed(() => Math.ceil(this.total / this.itemsPerPage()) || 1);
  cols = computed(() => Object.keys(this.columns));

  hasPrevious = computed(() => this.page() > 1);
  hasNext = computed(() => this.page() < this.pageTotal());

  sortedData = computed(() => {
    const items = this.data.sort((a, b) => {
      const asc = this.sorting().asc;
      const valA = a[this.sorting().col];
      const valB = b[this.sorting().col];

      if (valA == null) return asc ? 1 : -1;
      if (valB == null) return asc ? -1 : 1;

      if (isISODate(valA) && isISODate(valB)) {
        const aTime = new Date(valA).getTime();
        const bTime = new Date(valB).getTime();
        return asc ? aTime - bTime : bTime - aTime;
      }

      if (typeof valA === 'string' && typeof valB === 'string') {
        return asc
          ? valA.localeCompare(valB, undefined, { sensitivity: 'base' })
          : valB.localeCompare(valA, undefined, { sensitivity: 'base' });
      }

      if (valA > valB) return asc ? 1 : -1;
      if (valA < valB) return asc ? -1 : 1;
      return 0;
    });

    const chunks = [];
    for (let i = 0; i < items.length; i += this.itemsPerPage()) {
      const chunk = items.slice(i, i + this.itemsPerPage());
      chunks.push(chunk);
    }

    return chunks;
  });

  itemsPerPageOptions: SelectOption[] = [
    {
      id: '1',
      label: '10',
      value: '10',
    },
    {
      id: '2',
      label: '20',
      value: '20',
    },
    {
      id: '3',
      label: '25',
      value: '25',
    },
    {
      id: '4',
      label: '30',
      value: '30',
    },
    {
      id: '5',
      label: '40',
      value: '40',
    },
    {
      id: '6',
      label: '50',
      value: '50',
    },
  ];

  setItemsPerPage(num: string) {
    this.itemsPerPage.set(Number(num));
  }

  getColumns(row: Data) {
    return Object.entries(row);
  }

  getTrackRow(row: Data) {
    return row[this.idCol];
  }

  getSortIcon(col: string) {
    if (col === this.sorting().col) {
      return this.sorting().asc ? 'arrow-up-outline' : 'arrow-down-outline';
    }

    return 'swap-vertical-outline';
  }

  setSort(col: string, asc: boolean) {
    this.sorting.update(() => ({ col, asc }));
  }

  transform(value: unknown, fn?: (value: unknown) => string) {
    if (typeof fn === 'function') {
      return fn(value);
    }

    return value;
  }

  getPageRange() {
    const start = (this.page() - 1) * this.itemsPerPage() + 1;
    const end = Math.min(this.page() * this.itemsPerPage(), this.total);
    return { start, end };
  }

  previousPage() {
    if (this.hasPrevious()) {
      this.getMore.emit(this.getPageRange());
      this.page.update((val) => val - 1);
    }
  }

  nextPage() {
    if (this.hasNext()) {
      this.getMore.emit(this.getPageRange());
      this.page.update((val) => val + 1);
    }
  }
}
