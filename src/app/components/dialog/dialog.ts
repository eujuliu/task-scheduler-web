import {
  Component,
  ContentChild,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  Input,
  signal,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Button, ButtonSize, ButtonStyle } from '../button/button';
import { Dialog as CdkDialog } from '@angular/cdk/dialog';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-dialog',
  imports: [Button, NgTemplateOutlet],
  templateUrl: './dialog.html',
  styleUrl: './dialog.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Dialog {
  @ViewChild('dialog') dialogTemplate!: TemplateRef<unknown>;
  @ContentChild('content') contentTemplate!: TemplateRef<unknown>;

  @Input({ required: false }) buttonStyle: ButtonStyle = 'outline';
  @Input({ required: false }) buttonSize: ButtonSize = 'md';
  @Input({ required: false }) persistent = false;

  protected opened = signal(false);
  private dialog = inject(CdkDialog);

  open() {
    this.opened.set(true);
    this.dialog.open(this.dialogTemplate, {
      hasBackdrop: true,
      backdropClass: 'dialog-backdrop',
      panelClass: 'dialog-panel',
      disableClose: this.persistent,
      role: 'dialog',
    });
  }

  close() {
    this.opened.set(false);
    this.dialog.closeAll();
  }
}
