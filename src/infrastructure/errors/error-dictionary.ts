import {ValidationErrors} from "@angular/forms";

export class ErrorDictionary {
  static getItem(error: ValidationErrors): string {
    if (error && error.key && error.value) {
      switch (error.key) {
        case "required":
          return "Pole jest wymagane"
        case "email":
          return "Niepoprawny format adresu e-mail"
        case "zipCode":
          return "Niepoprawny format kodu pocztowego"
        case "minlength":
          return "Minimalna długość: " + error.value.requiredLength + ", obecna długość: " + error.value.actualLength
        case "maxlength":
          return "Maksymalna długość: " + error.value.requiredLength + ", obecna długość: " + error.value.actualLength
        case "password":
          return "Haslo musi zawierać co najmniej jedną cyfrę, jedną wielką literę, jedną małą literę i jeden znak specjalny"
        default:
          return '';
      }
    }
    return '';
  }
}
