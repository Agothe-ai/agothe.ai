// Advanced form validation system with custom rules and real-time feedback

export interface ValidationRule {
  validate: (value: any) => boolean;
  message: string;
}

export interface FieldValidation {
  rules: ValidationRule[];
  error: string | null;
  touched: boolean;
}

export class FormValidator {
  private fields: Map<string, FieldValidation> = new Map();
  private form: HTMLFormElement;

  constructor(form: HTMLFormElement) {
    this.form = form;
    this.setupEventListeners();
  }

  addField(name: string, rules: ValidationRule[]): void {
    this.fields.set(name, {
      rules,
      error: null,
      touched: false,
    });
  }

  private setupEventListeners(): void {
    this.form.addEventListener('submit', this.handleSubmit);
    
    const inputs = this.form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
      input.addEventListener('blur', () => this.validateField(input.getAttribute('name') || ''));
      input.addEventListener('input', () => {
        const fieldName = input.getAttribute('name') || '';
        const field = this.fields.get(fieldName);
        if (field && field.touched) {
          this.validateField(fieldName);
        }
      });
    });
  }

  private handleSubmit = (e: Event) => {
    e.preventDefault();
    
    let isValid = true;
    this.fields.forEach((_, name) => {
      if (!this.validateField(name)) {
        isValid = false;
      }
    });

    if (isValid) {
      this.form.dispatchEvent(new CustomEvent('validsubmit', {
        detail: this.getFormData(),
      }));
    }
  };

  validateField(name: string): boolean {
    const field = this.fields.get(name);
    if (!field) return true;

    field.touched = true;
    const input = this.form.querySelector(`[name="${name}"]`) as HTMLInputElement;
    if (!input) return true;

    const value = input.value;
    
    for (const rule of field.rules) {
      if (!rule.validate(value)) {
        field.error = rule.message;
        this.showError(name, rule.message);
        return false;
      }
    }

    field.error = null;
    this.clearError(name);
    return true;
  }

  private showError(name: string, message: string): void {
    const input = this.form.querySelector(`[name="${name}"]`);
    if (!input) return;

    input.classList.add('invalid');
    
    let errorElement = this.form.querySelector(`[data-error-for="${name}"]`);
    if (!errorElement) {
      errorElement = document.createElement('div');
      errorElement.setAttribute('data-error-for', name);
      errorElement.className = 'error-message';
      input.parentElement?.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
  }

  private clearError(name: string): void {
    const input = this.form.querySelector(`[name="${name}"]`);
    if (!input) return;

    input.classList.remove('invalid');
    
    const errorElement = this.form.querySelector(`[data-error-for="${name}"]`);
    if (errorElement) {
      errorElement.textContent = '';
    }
  }

  getFormData(): Record<string, any> {
    const formData = new FormData(this.form);
    const data: Record<string, any> = {};
    
    formData.forEach((value, key) => {
      data[key] = value;
    });
    
    return data;
  }

  reset(): void {
    this.form.reset();
    this.fields.forEach((field, name) => {
      field.touched = false;
      field.error = null;
      this.clearError(name);
    });
  }

  isValid(): boolean {
    let valid = true;
    this.fields.forEach((_, name) => {
      if (!this.validateField(name)) {
        valid = false;
      }
    });
    return valid;
  }
}

// Validation rule factories
export const required = (message = 'This field is required'): ValidationRule => ({
  validate: (value) => value !== null && value !== undefined && value !== '',
  message,
});

export const minLength = (length: number, message?: string): ValidationRule => ({
  validate: (value) => String(value).length >= length,
  message: message || `Minimum length is ${length} characters`,
});

export const maxLength = (length: number, message?: string): ValidationRule => ({
  validate: (value) => String(value).length <= length,
  message: message || `Maximum length is ${length} characters`,
});

export const email = (message = 'Invalid email address'): ValidationRule => ({
  validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value)),
  message,
});

export const pattern = (regex: RegExp, message: string): ValidationRule => ({
  validate: (value) => regex.test(String(value)),
  message,
});

export const min = (minimum: number, message?: string): ValidationRule => ({
  validate: (value) => Number(value) >= minimum,
  message: message || `Value must be at least ${minimum}`,
});

export const max = (maximum: number, message?: string): ValidationRule => ({
  validate: (value) => Number(value) <= maximum,
  message: message || `Value must be at most ${maximum}`,
});

export const matches = (fieldName: string, message: string): ValidationRule => ({
  validate: (value, form) => {
    const otherField = form?.querySelector(`[name="${fieldName}"]`) as HTMLInputElement;
    return otherField ? value === otherField.value : true;
  },
  message,
});

export const url = (message = 'Invalid URL'): ValidationRule => ({
  validate: (value) => {
    try {
      new URL(String(value));
      return true;
    } catch {
      return false;
    }
  },
  message,
});

export const phone = (message = 'Invalid phone number'): ValidationRule => ({
  validate: (value) => /^[\d\s()+-]+$/.test(String(value)) && String(value).replace(/\D/g, '').length >= 10,
  message,
});

export const createValidator = (form: HTMLFormElement) => new FormValidator(form);
