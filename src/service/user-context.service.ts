import {Injectable} from '@angular/core';
import {User} from "../model/user";

@Injectable({
  providedIn: 'root'
})
export class UserContextService {

  user: User;

  constructor() {
    this.user = new User()
    this.user.name = '';
    this.user.id = -1;
  }
}
