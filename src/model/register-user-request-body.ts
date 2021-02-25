import {Validators} from "@angular/forms";
import {CustomValidators} from "../infrastructure/validators/custom-validators";

export class RegisterUserRequestBody {
  login: string = '';
  password: string = '';
  imie: string = '';
  email: string = '';
}
