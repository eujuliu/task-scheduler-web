import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import {
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidatorFn,
} from '@angular/forms';
import { Button } from '../button/button';
import { InputComponent, InputType } from '../input/input';

export interface FormField {
  id: string;
  label: string;
  type: InputType;
  placeholder: string;
  validators: ValidatorFn[];
  value?: unknown;
}

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule, Button, InputComponent],
  templateUrl: './form.html',
  styleUrl: './form.css',
})
export class Form implements OnInit {
  @Input({ required: true }) fields: FormField[] = [];
  @Input({ required: false }) direction: 'column' | 'row' = 'column';

  @Output() sendData = new EventEmitter<Record<string, unknown>>();
  @Output() formBuilded = new EventEmitter<FormGroup>();

  fb = inject(NonNullableFormBuilder);
  form!: FormGroup;

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm() {
    const formControls: Record<string, unknown> = {};

    this.fields.forEach((field) => {
      formControls[field.id] = [field.value ?? '', field.validators];
    });

    this.form = this.fb.group(formControls);

    this.formBuilded.emit(this.form);
  }

  onSubmit() {
    console.log(this.form.value);
    this.form.reset();
  }
}
