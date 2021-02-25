import {Component, OnInit} from '@angular/core';
import {HttpService} from "../../service/http.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomValidators} from "../../infrastructure/validators/custom-validators";
import {LoginUserRequestBody} from "../../model/login-user-request-body";
import {User} from "../../model/user";
import {UserContextService} from "../../service/user-context.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private httpService: HttpService, private userContextService: UserContextService) {
    this.formGroup = this.formBuilder.group(
      {
        login: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(32)]],
        password: ['', [CustomValidators.PasswordValidator, Validators.required, Validators.minLength(8), Validators.maxLength(32)]]
      }
    );
  }

  ngOnInit(): void {
  }

  isValid() {
    return this.formGroup.valid;
  }

  onSubmit() {
    console.log('this.formGroup.value as LoginUserRequestBody', this.formGroup.value as LoginUserRequestBody);
    /*    this.httpService.loginUser(this.formGroup.value as LoginUserRequestBody).subscribe(response => {
          if (response) {
            this.userContextService.user = response as User;
            this.router.navigate(['/']);
          }
        });*/
    //todo delete mock
    if (this.formGroup.value as User) {
      this.userContextService.user = this.formGroup.value as User;
      this.router.navigate(['/']);;
    }
  }

}
