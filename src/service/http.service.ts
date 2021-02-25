import {Injectable} from '@angular/core';
import {Offer} from "../model/offer";
import {SearchCriteria} from "../model/search-criteria";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Category} from "../model/category";
import {PasswordChangeRequestBody} from "../model/password-change-request-body";
import {EmailChangeRequestBody} from "../model/email-change-request-body";
import {AddressDetails} from "../model/address-details";
import {GetMessagesRequestBody} from "../model/get-messages-request-body";
import {Message} from "../model/message";
import {User} from "../model/user";
import {SendMessageRequestBody} from "../model/send-message-request-body";
import {LoginUserRequestBody} from "../model/login-user-request-body";
import {RegisterUserRequestBody} from "../model/register-user-request-body";
import {UserContextService} from "./user-context.service";


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json',
      'Access-Control-Allow-Origin' : 'http://localhost:8080',
      'Access-Control-Allow-Methods' : 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
      'Access-Control-Allow-Headers' : 'X-Requested-With,content-type',
      'Access-Control-Allow-Credentials' : 'true'
    })
  };

  constructor(private http: HttpClient, private userContextService: UserContextService) {
  }

  getOffers(searchCriteria: SearchCriteria): Observable<Offer[]> {
    return this.http.post<Offer[]>('http://localhost:8080/rest/getOffers', searchCriteria, this.httpOptions);
  }

  getOffersMock(searchCriteria: SearchCriteria): any[] {
    const categories = this.getCategoriesMock();
    const items = [];
    for (let i = 0; i < 100; i++) {
      items.push({
        id: i,
        title: "item" + i,
        price: i * 2.50,
        description: "opis" + i,
        address: 'Gliwice, Akademicka 2',
        category: categories[parseInt((Math.random() * (categories.length - 1)).toString())].name,
        location: {lat: 50.288757 + i * 0.0001, lng: 18.677896 + i * 0.0001},
        publishDate: new Date(),
        photos: [],
        owner: 'wlasciciel' + i,
        viewedCounter: 0
      } as Offer);
    }
    return items.slice(0, searchCriteria.dataPerPage) as any[];
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>('http://localhost:8080/rest/getCategories');
  }

  getCategoriesMock(): Category[] {
    return [{name: 'Motoryzacja'}, {name: 'Nieruchomosci'}, {name: 'Praca'}, {name: 'Elektronika/AGD'},
      {name: 'Muzyka'}, {name: 'Książki'}, {name: 'Ubrania'}, {name: 'Dzieci'}, {name: 'Inne'}];
  }

  addOffer(body: Offer): Observable<void> {
    return this.http.post<void>('http://localhost:8080/rest/addOffer', body);
  }

  increaseOfferViewedCounter(body: Offer): Observable<void> {
    return this.http.post<void>('http://localhost:8080/rest/increaseOfferViewedCounter', body);
  }

  saveUserPasswordChange(passwordChangeRequestBody: PasswordChangeRequestBody): Observable<void> {
    return this.http.post<void>('http://localhost:8080/rest/changePassword', passwordChangeRequestBody);
  }

  saveUserEmailChange(emailChangeRequestBody: EmailChangeRequestBody): Observable<void> {
    return this.http.post<void>('http://localhost:8080/rest/changeEmail', emailChangeRequestBody);
  }

  saveUserAddressDetailsChange(addressDetailsRequestBody: AddressDetails): Observable<void> {
    return this.http.post<void>('http://localhost:8080/rest/changeAddressDetails', addressDetailsRequestBody);
  }

  getAddressDetails(userID: number): Observable<AddressDetails> {
    return this.http.post<AddressDetails>('http://localhost:8080/rest/getAddressDetails', userID);
  }

  getMessages(secondUserId: number): Observable<Message[]> {
    return this.http.post<Message[]>('http://localhost:8080/rest/getMessages',
      new GetMessagesRequestBody(this.userContextService.user.id, secondUserId));
  }


  getMessagesMock(secondUserId: number): Message[] {
    const messages: Message[] = new Array<Message>();
    for (let i = 0; i < 30; i++) {
      messages.push(new Message("content: wiadomosc nr: " + i,
        new Date(),
        'author', 'offerTitle' + i));
    }
    return messages;
  }

  getConversationUsersMock() {
    const users: User[] = [];
    for (let i = 0; i < 30; i++) {
      users.push({id: i, name: ' nazwa' + i});
    }
    return users;
  }

  sendMessage(message: SendMessageRequestBody): Observable<void> {
    return this.http.post<void>('http://localhost:8080/rest/sendMessage', message);
  }

  getConversationUsers(userID: number) {
    return this.http.post<User[]>('http://localhost:8080/rest/getUsers', this.userContextService.user.id);
  }

  loginUser(value: LoginUserRequestBody): Observable<User> {
    return this.http.post<User>('http://localhost:8080/rest/login', value);
  }

  registerUser(value: RegisterUserRequestBody): Observable<User> {
    return this.http.post<User>('http://localhost:8080/rest/register', value);
  }
}

