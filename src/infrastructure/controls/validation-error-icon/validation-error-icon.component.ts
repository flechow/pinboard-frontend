import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl} from "@angular/forms";

@Component({
  selector: 'app-validation-error-icon',
  templateUrl: './validation-error-icon.component.html',
  styleUrls: ['./validation-error-icon.component.scss']
})
export class ValidationErrorIconComponent implements OnInit {
  @Input() control: AbstractControl = <AbstractControl>{};
  constructor() { }

  ngOnInit(): void {
  }

}
