import {Component, OnInit} from '@angular/core';
import {HttpService} from "../../service/http.service";
import {Message} from "../../model/message";
import {User} from "../../model/user";
import {SendMessageRequestBody} from "../../model/send-message-request-body";
import {UserContextService} from "../../service/user-context.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-inbox',
  templateUrl: './user-inbox.component.html',
  styleUrls: ['./user-inbox.component.scss']
})
export class UserInboxComponent implements OnInit {
  users: Array<User> = [];
  messageText: string = '';

  messages: Message[] = new Array<Message>();
  viewingMessagesFromUserName: string = '';
  offerTitle: string = '';

  constructor(private userContextService: UserContextService, private httpService: HttpService, private router: Router) {
    if (this.userContextService.user.id) {
      this.router.navigate(['/login']);
    }
    this.loadUsers();
    if (this.users && this.users.length > 0) {
      this.loadMessages(this.users[0].name, this.users[0].id);
    }
  }

  ngOnInit(): void {
  }

  loadMessages(name: string, id: number) {
    this.viewingMessagesFromUserName = name;
    this.messages = this.httpService.getMessagesMock(id);
    /* this.httpService.getMessages(id).subscribe(response => {
       if (response) {
         this.messages = response;
       }
     });*/
  }

  loadUsers() {
    /*     this.httpService.getConversationUsers(this.userContext.userID).subscribe(response => {
        if (response) {
          this.users = response;
        }
      });*/
    this.users = this.httpService.getConversationUsersMock();
  }

  sendMessage() {
    if (this.messageText) {
      const requestBody = new SendMessageRequestBody();
      requestBody.content = this.messageText;
      requestBody.owner = this.viewingMessagesFromUserName;
      requestBody.senderID = 0;
      // this.httpService.sendMessage(requestBody).subscribe(response => {});
      this.messageText = '';
    }
  }
}
