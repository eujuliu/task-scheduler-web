import { Component } from '@angular/core';
import { Form, FormField } from '../../components/form/form';
import { FormGroup, Validators } from '@angular/forms';
import { Button } from '../../components/button/button';
import { StrengthIndicatorResponse } from '../../components/input/input';

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
      strengthValidator(value) {
        let strength = 0;
        const levels: Record<number, StrengthIndicatorResponse> = {
          2: 'weak',
          3: 'medium',
          4: 'good',
          5: 'strong',
        };

        if (value.length > 8) strength += 1;
        if (/(?=.*?[A-Z])/g.test(value)) strength += 1;
        if (/(?=.*?[a-z])/g.test(value)) strength += 1;
        if (/(?=.*?[0-9])/g.test(value)) strength += 1;
        if (/(?=.*?[#?!@$%^&*-])/g.test(value)) strength += 1;

        return levels[strength] ?? '';
      },
    },
  ];

  register(data: Record<string, unknown>) {
    console.log(data);
  }
}
