import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Offer} from "../../model/offer";
import {FormBuilder} from "@angular/forms";
import {HttpService} from "../../service/http.service";
import {Router} from "@angular/router";
import {SendMessageRequestBody} from "../../model/send-message-request-body";
import {UserContextService} from "../../service/user-context.service";

@Component({
  selector: 'app-message-owner-modal',
  templateUrl: './message-owner-modal.component.html',
  styleUrls: ['./message-owner-modal.component.scss']
})
export class MessageOwnerModalComponent implements OnInit {
  @Input() offer: Offer = new Offer();
  @Output() closeModalEvent: EventEmitter<void> = new EventEmitter<void>();
  sendMessageRequestBody: SendMessageRequestBody = new SendMessageRequestBody();

  constructor(private formBuilder: FormBuilder, private httpService: HttpService, private userContextService: UserContextService, private router: Router) {

  }

  ngOnInit(): void {
    this.sendMessageRequestBody.offerID = this.offer?.id;
    this.sendMessageRequestBody.senderID = this.userContextService.user.id;
    this.sendMessageRequestBody.owner = this.offer?.owner;
  }

  closeModal() {
    this.closeModalEvent.emit();
  }

  send() {
    /*  this.httpService.sendMessage(sendMessageRequestBody).subscribe(response => {
      this.closeModal();
    }
  );*/
    this.closeModal();
  }
}
