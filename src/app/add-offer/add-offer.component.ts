import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpService} from "../../service/http.service";
import {Category} from "../../model/category";
import {Router} from "@angular/router";
import {Offer} from "../../model/offer";
import {AddressWithCoords} from "../../model/address-with-coords";
import {UserContextService} from "../../service/user-context.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.component.html',
  styleUrls: ['./add-offer.component.scss']
})
export class AddOfferComponent implements OnInit {

  formGroup: FormGroup;
  @Output() close = new EventEmitter<void>();
  categories: Category[] = [];
  images: any[] = [];
  imageError: boolean = false;
  totalSize: number = 0;
  addressEnabled: boolean = true;
  location: google.maps.LatLng = new google.maps.LatLng(0, 0);

  constructor(private formBuilder: FormBuilder, private userContextService: UserContextService, private httpService: HttpService, private router: Router) {

    this.formGroup = this.formBuilder.group(
      {
        title: ['', [Validators.required]],
        price: ['', [Validators.required, Validators.minLength(0)]],
        category: ['', [Validators.required, Validators.minLength(0)]],
        address: ['', [Validators.required]],
        description: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(4196)]],
        photos: []
      });
    if (this.userContextService.user.id) {
      this.router.navigate(['/login']);
      return;
    }
    this.categories = this.httpService.getCategoriesMock();
    if (this.router.getCurrentNavigation()?.extras?.state?.data) {
      const offer = JSON.parse(this.router.getCurrentNavigation()?.extras?.state?.data) as Offer;
      this.location = new google.maps.LatLng(offer.location.lat, offer.location.lng); // albo odwrotnie ?
      this.formGroup.get('title')?.setValue(offer.title);
      this.formGroup.get('price')?.setValue(offer.price);
      this.formGroup.get('category')?.setValue(offer.category);
      this.formGroup.get('address')?.setValue(offer.address);
      this.addressEnabled = !this.formGroup.get('address')?.value;
      this.addressEnabled ? this.formGroup.get('address')?.enable() : this.formGroup.get('address')?.disable();
      this.formGroup.get('description')?.setValue(offer.description);
      this.formGroup.get('photos')?.setValue(offer.photos);
      this.images = offer.photos;
    }
  }

  ngOnInit() {
  }

  onSelectFile(fileEvent: any) {
    if (fileEvent.target.files && fileEvent.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (fileEvent.target?.files[0]?.size < 1024 * 1024) {
          this.totalSize += fileEvent.target?.files[0]?.size;
          this.images.push(reader.result);
        } else {
          this.imageError = true;
        }
      }
      reader.readAsDataURL(fileEvent.target.files[0]);
    }
  }

  dispatch($event: MouseEvent) {
    $event.stopPropagation();
  }

  submit() {
    const body: Offer = this.getFormData();
    this.httpService.addOffer(body).subscribe(response => {
              // @ts-ignore
      if (response) {
                this.router.navigate(['/']);
              }
            });
  }

  closeDialog() {
    this.close.emit();
  }

  isValid() {
    return this.formGroup.valid;
  }

  getFormData(omitValidity?: boolean): Offer {
    this.formGroup.value.photos = this.images;
    const offer: Offer = this.formGroup.value as Offer;
    offer.address = this.formGroup.get('address')?.value;
    offer.location = this.location.toJSON();
    offer.publishDate = new Date();
    return <Offer>(omitValidity || this.isValid() ? offer : null);
  }

  preview() {
    this.formGroup.get('address')?.enable();
    return this.router.navigate(['/preview'], {
      state: {data: JSON.stringify(this.getFormData()), previewOnly: true}
    });
  }

  deleteImage(image: any) {
    this.images.splice(this.images.indexOf(image), 1);
  }

  onAddressUpdate(addressWithCoords: AddressWithCoords) {
    this.formGroup.get('address')?.setValue(addressWithCoords?.address);
    this.location = new google.maps.LatLng(addressWithCoords?.location?.lat, addressWithCoords?.location?.lng);
    this.addressEnabled = !this.addressEnabled;
    this.addressEnabled ? this.formGroup.get('address')?.enable() : this.formGroup.get('address')?.disable();
  }

}
