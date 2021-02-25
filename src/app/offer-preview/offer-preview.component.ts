import {Component, OnInit} from '@angular/core';
import {Offer} from "../../model/offer";
import {Router} from "@angular/router";
import {HttpService} from "../../service/http.service";
import {UserContextService} from "../../service/user-context.service";

@Component({
  selector: 'app-offer-preview',
  templateUrl: './offer-preview.component.html',
  styleUrls: ['./offer-preview.component.scss']
})
export class OfferPreviewComponent implements OnInit {
  offer: Offer = new Offer();
  images: any[] = [];
  selectedImage: any = 'favicon.ico';
  previewOnly: boolean = false;
  marker: google.maps.Marker = new google.maps.Marker();
  sendMessageVisible: boolean = false;

  constructor(private userContextService: UserContextService, private httpService: HttpService, private router: Router) {
    if (this.userContextService.user.id) {
      this.router.navigate(['/login']);
      return;
    }

    if (this.router.getCurrentNavigation()?.extras?.state?.data) {
      this.offer = JSON.parse(this.router.getCurrentNavigation()?.extras?.state?.data) as Offer;
      this.offer.publishDate = new Date(this.offer.publishDate);
      this.images = this.offer?.photos;
      this.selectedImage = this.images && this.images?.length > 0 ? this.images[0] : 'favicon.ico';
      this.marker.setTitle(this.offer.title);
      this.marker.setPosition(new google.maps.LatLng(50.01523, 20.16304));
      this.marker.set('price', this.offer.price);
      this.marker.set('address', this.offer.address);
      this.marker.set('thumbnail', this.offer.photos[0]);
      this.marker.set('publishDate', this.offer.publishDate);
      this.marker.set('location', this.offer.location); // tu nie wiem
    }
    if (this.router.getCurrentNavigation()?.extras?.state?.previewOnly) {
      this.previewOnly = this.router.getCurrentNavigation()?.extras?.state?.previewOnly;
    }
    if (!this.previewOnly) {
      /*    this.httpService.increaseOfferViewedCounter(this.offer).subscribe(response => {
          });*/
    }
  }

  ngOnInit(): void {
  }

  changeSelectedImage(image: any) {
    this.selectedImage = image;
  }

  getSelectedImage() {
    return this.selectedImage;
  }

  nextImage() {
    if (this.images && this.images.length > 0) {
      const index = this.images.findIndex(item => item === this.selectedImage);
      if (index + 1 < this.images.length) {
        this.selectedImage = this.images[index + 1];
      }
    }
  }

  previousImage() {
    if (this.images && this.images.length > 0) {
      const index = this.images.findIndex(item => item === this.selectedImage);
      if (index - 1 >= 0) {
        this.selectedImage = this.images[index - 1];
      }
    }
  }

  submit() {
    const body: Offer = this.offer;
    this.httpService.addOffer(body).subscribe(response => {
              // @ts-ignore
      if (response) {
                // @ts-ignore
        this.closeDialog();
              }
            });
  }

  changeModalVisibility() {
    this.sendMessageVisible = !this.sendMessageVisible;
  }

  back() {
    //przywracanie wartosci do formgroupy jeżelki to podgląd
    if (!this.previewOnly)
      window.history.back();
    else {
      this.router.navigate(['/add'], {
        state: {data: JSON.stringify(this.offer)}
      });
    }
  }

  onModalClose() {
    this.changeModalVisibility();
  }
}
