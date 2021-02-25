import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl} from "@angular/forms";

@Component({
  selector: 'app-info-icon',
  templateUrl: './info-icon.component.html',
  styleUrls: ['./info-icon.component.scss']
})
export class InfoIconComponent implements OnInit {
  @Input() name: string = '';
  @Input() control: AbstractControl = <AbstractControl>{};

  constructor() {
  }

  ngOnInit(): void {
  }

}
