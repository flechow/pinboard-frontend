export class SendMessageRequestBody {
  senderID: number = -1;
  owner: string = '';
  content: string = '';
  offerID?: number = -1;
}
