import {
  Component,
  computed,
  CUSTOM_ELEMENTS_SCHEMA,
  forwardRef,
  Input,
  signal,
} from '@angular/core';
import { Button } from '../button/button';
import { type ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export type InputType = 'text' | 'email' | 'password';
export type StrengthIndicatorResponse = 'weak' | 'medium' | 'good' | 'strong';
export type ValidationErrorsType =
  | 'required'
  | 'email'
  | 'minLength'
  | 'minNumbers'
  | 'minChar'
  | 'minEspecial';

export const ValidationErrors: Record<ValidationErrorsType, string> = {
  email: 'This email is not valid',
  minChar: "Don't have min characters quantity",
  minEspecial: "Don't have min especial characters quantity",
  minLength: "Don't have min length",
  minNumbers: "Don't have min numbers quantity",
  required: 'This field is required',
};

@Component({
  selector: 'app-input',
  templateUrl: './input.html',
  styleUrl: './input.css',
  imports: [Button],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class InputComponent implements ControlValueAccessor {
  @Input({ required: false }) type: InputType = 'text';
  @Input({ required: false }) label = '';
  @Input({ required: false, transform: (val: string) => val.trim() }) placeholder = '';
  @Input({ required: false }) icon = '';

  @Input({ required: false }) invalid = false;
  @Input({ required: false }) touched = false;
  @Input({ required: false }) dirty = false;

  @Input({
    required: false,
    transform: (errors: Record<string, unknown>) => Object.keys(errors ?? {}),
  })
  errors: ValidationErrorsType[] = [];

  @Input({
    required: false,
  })
  validateValueStrength?: (value: string) => StrengthIndicatorResponse;

  strength = signal('');

  protected value = '';
  protected disabled = false;

  showPassword = signal(false);

  formattedLabel = computed(() => this.label.toLowerCase().trim().replaceAll(' ', '-'));
  inputType = computed(() =>
    this.type !== 'password' ? this.type : this.showPassword() ? 'text' : 'password',
  );

  onChanged?: (value: unknown) => void;
  onTouched?: () => void;

  getErrorMessage(key: ValidationErrorsType) {
    return ValidationErrors[key];
  }

  changeInputVisibility() {
    this.showPassword.update((v) => !v);
  }

  writeValue(value: string) {
    this.value = value;
  }

  registerOnChange(fn: (value: unknown) => void) {
    this.onChanged = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  setInput(event: Event) {
    if (!this.disabled) {
      const target = event.target as HTMLInputElement;

      this.writeValue(target.value);

      if (this.onChanged) this.onChanged(target.value);
      if (this.onTouched) this.onTouched();

      if (this.validateValueStrength) {
        const strength = this.validateValueStrength(target.value);

        this.strength.update(() => strength);
      }
    }
  }
}
