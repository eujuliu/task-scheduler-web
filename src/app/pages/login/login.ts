import { Component } from '@angular/core';
import { Form, FormField } from '../../components/form/form';
import { Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [Form, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  formFields: FormField[] = [
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

  login(data: Record<string, unknown>) {
    console.log(data);
  }
}
