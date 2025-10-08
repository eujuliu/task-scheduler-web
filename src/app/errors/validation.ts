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
