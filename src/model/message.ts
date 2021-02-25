export class Message {
  constructor(content: string, sent: Date, author: string, offerTitle: string) {
    this.content = content;
    this.sent = sent;
    this.author = author; // author id / name ?
    this.offerTitle = offerTitle; // author id / name ?
  }

  content: string = ''
  sent: Date = new Date();
  author: string = '';
  offerTitle: string = '';
}
