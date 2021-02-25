export class GetMessagesRequestBody {

  loggedUserId: number = 0;
  secondUserId: number = 0;
  constructor(loggedUserId: number, secondUserId: number) {
    this.loggedUserId = loggedUserId;
    this.secondUserId = secondUserId;
  }

}

