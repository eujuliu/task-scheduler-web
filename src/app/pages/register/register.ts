import { Component } from '@angular/core';
import { Form, FormField } from '../../components/form/form';
import { FormGroup, Validators } from '@angular/forms';
import { Button } from '../../components/button/button';

@Component({
  selector: 'app-register',
  imports: [Form, Button],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  form!: FormGroup;
  formFields: FormField[] = [
    {
      id: 'username',
      label: 'Username*',
      placeholder: 'Type your best username',
      type: 'text',
      validators: [Validators.required],
    },
    {
      id: 'email',
      label: 'Email*',
      placeholder: 'Type your best email',
      type: 'email',
      validators: [Validators.required],
    },
    {
      id: 'password',
      label: 'Password*',
      placeholder: 'Type your best password',
      type: 'password',
      validators: [Validators.required],
    },
  ];

  register(data: Record<string, unknown>) {
    console.log(data);
  }
}
