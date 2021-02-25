import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpService} from "../../service/http.service";
import {CustomValidators} from "../../infrastructure/validators/custom-validators";
import {LoginUserRequestBody} from "../../model/login-user-request-body";
import {RegisterUserRequestBody} from "../../model/register-user-request-body";
import {Router} from "@angular/router";
import {UserContextService} from "../../service/user-context.service";
import {User} from "../../model/user";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private httpService: HttpService, private userContextService: UserContextService) {
    this.formGroup = this.formBuilder.group(
      {
        login: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(32)]],
        password: ['', [CustomValidators.PasswordValidator, Validators.required, Validators.minLength(8), Validators.maxLength(32)]],
        imie: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(32)]],
        email: ['', [Validators.email, Validators.required, Validators.minLength(8), Validators.maxLength(32)]],
      });
  }

  ngOnInit(): void {
  }

  isValid() {
    return this.formGroup.valid;
  }

  onSubmit() {
    /*  this.httpService.registerUser(this.formGroup.value as RegisterUserRequestBody).subscribe(response => {
        if (response) {
          const login = new LoginUserRequestBody();
          login.login = this.formGroup.value.login;
          login.password = this.formGroup.value.password;
          this.httpService.loginUser(login).subscribe(response => {
            if (response) {
              this.userContextService.user = response as User;
              this.router.navigate(['/']);
            }
          });
        }
      });
    */
    //todo delete mock
    if (this.formGroup.value as User) {
      this.userContextService.user = this.formGroup.value as User;
      this.router.navigate(['/']);
    }
  }
}
