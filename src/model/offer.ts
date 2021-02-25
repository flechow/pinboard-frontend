import {LatLng} from "./lat-lng";

export class Offer {
  price = 0; //BigDecimal ?
  publishDate: Date = new Date();
  address = '';
  category = '';
  title = '';
  owner = ''
  description = '';
  viewedCounter = 0;
  photos: any[] = [];
  location!: LatLng;
  id: number = -1;
}
