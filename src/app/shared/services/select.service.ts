import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SelectService {
  private sources: Record<string, Subject<unknown>> = {};

  private add(id: string) {
    this.sources[id] = new Subject();
  }

  set(id: string, value: unknown) {
    if (!(id in this.sources)) this.add(id);

    this.sources[id].next(value);
  }

  get(id: string) {
    if (!(id in this.sources)) this.add(id);

    return this.sources[id];
  }

  destroy(id: string) {
    if (this.sources[id]) {
      this.sources[id].complete();
      delete this.sources[id];
    }
  }
}
