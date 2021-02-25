import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpService} from "../../service/http.service";
import {CustomValidators} from "../../infrastructure/validators/custom-validators";
import {UserContextService} from "../../service/user-context.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent implements OnInit {

  passwordFormGroup: FormGroup;
  emailFormGroup: FormGroup;
  addressDetailsFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private userContextService: UserContextService, private httpService: HttpService, private router: Router) {
    this.passwordFormGroup = this.formBuilder.group(
      {
        currentPassword: ['', [CustomValidators.PasswordValidator, Validators.required, Validators.minLength(8), Validators.maxLength(32)]],
        newPassword: ['', [CustomValidators.PasswordValidator, Validators.required, Validators.minLength(8), Validators.maxLength(32)]],
      });
    this.emailFormGroup = this.formBuilder.group(
      {
        currentEmail: ['', [Validators.email, Validators.required, Validators.minLength(8), Validators.maxLength(32)]],
        newEmail: ['', [Validators.email, Validators.required, Validators.minLength(8), Validators.maxLength(32)]],
      });
    this.addressDetailsFormGroup = this.formBuilder.group(
      {
        accountType: ['0', [Validators.required]],
        name: ['', [Validators.required]],
        street: ['', [Validators.required]],
        zipCode: ['', [CustomValidators.ZIPCodeValidator, Validators.required]],
        city: ['', [Validators.required]],
        houseNo: ['', [Validators.required]],
        flatNo: [''],
        NIP: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
        phoneNumber: ['', [Validators.required]],
      });
    this.isCompany();
    if (this.userContextService.user.id) {
      this.router.navigate(['/login']);
      return;
    }
  }

  ngOnInit(): void {
    //
    /* this.httpService.getAddressDetails(this.userContextService.user.id).subscribe(response => {
       if (response)
         this.addressDetailsFormGroup.setValue(response);
     });*/
  }

  isPasswordFormGroupValid() {
    return this.passwordFormGroup.valid;
  }

  isEmailFormGroupValid() {
    return this.emailFormGroup.valid;
  }

  isAddressDetailsFormGroupValid() {
    return this.addressDetailsFormGroup.valid;
  }

  onPasswordSubmit() {
    this.httpService.saveUserPasswordChange(this.passwordFormGroup.value).subscribe(response => {
      console.log('haslo');
      this.router.navigate(['/']);
    });
  }

  onEmailSubmit() {
    this.httpService.saveUserEmailChange(this.emailFormGroup.value).subscribe(response => {
      console.log('email');
      this.router.navigate(['/']);
    });
  }

  onAddressDetailsSubmit() {
    this.httpService.saveUserAddressDetailsChange(this.addressDetailsFormGroup.value).subscribe(response => {
      console.log('adres');
      this.router.navigate(['/']);
    });
  }

  isCompany() {
    if (this.addressDetailsFormGroup && this.addressDetailsFormGroup.get('accountType')) {
      this.addressDetailsFormGroup.get('accountType')?.value === '1' ? this.addressDetailsFormGroup.get('NIP')?.enable() : this.addressDetailsFormGroup.get('NIP')?.disable();
      return;
    }
  }
}
