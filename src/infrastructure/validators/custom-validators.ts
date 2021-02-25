import {AbstractControl, FormGroup, ValidationErrors} from "@angular/forms";

export class CustomValidators {
  static ZIPCodeValidator(control: AbstractControl) {
    const zip = control.value;
    return zip && (zip.length !== 6 || zip.charAt(2) !== '-') ? <ValidationErrors>{zipCode: true} : null;
  }

  static PriceValidator(formGroup: FormGroup) {
    const max = formGroup.get('maxPrice')?.value;
    const min = formGroup.get('minPrice')?.value;
    return max != null && min != null && min > max ? <ValidationErrors>{price: true} : null;
  }

  static DateValidator(formGroup: FormGroup) {
    const minDate = formGroup.get('publishDateFrom')?.value;
    const maxDate = formGroup.get('publishDateTo')?.value;
    return maxDate != null && minDate != null && minDate > maxDate ? <ValidationErrors>{date: true} : null;
  }

  static PasswordValidator(control: AbstractControl) {
    const password = control?.value;
    return password != null && !new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@#!%*?&])[A-Za-z\d$@#!%*?&].{7,}').test(password) ? <ValidationErrors>{password: true} : null;
  }
}
