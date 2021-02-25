import {Component, Input, OnInit} from '@angular/core';
import {ErrorDictionary} from "../../errors/error-dictionary";
import {AbstractControl} from "@angular/forms";

@Component({
  selector: 'app-validaton-error',
  templateUrl: './validaton-error.component.html',
  styleUrls: ['./validaton-error.component.scss']
})
export class ValidatonErrorComponent implements OnInit {
  @Input() control: AbstractControl = <AbstractControl>{};

  constructor() {
  }

  ngOnInit(): void {
  }

  getError(error: object): string {
    return ErrorDictionary.getItem(error);
  }
}
