import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl} from "@angular/forms";
import {InfoDictionary} from "../../infos/info-dictionary";

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  @Input() name: string = '';
  @Input() control: AbstractControl = <AbstractControl>{};
  constructor() {
  }

  ngOnInit(): void {
  }

  getInfo(name: string): string {
    return InfoDictionary.getItem(name);

  }
}
