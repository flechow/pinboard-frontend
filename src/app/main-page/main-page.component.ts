import {Component, OnInit} from '@angular/core';
import {HttpService} from "../../service/http.service";
import {SearchCriteria} from "../../model/search-criteria";
import {Offer} from "../../model/offer";
import {PagingInfo} from "../../model/paging-info";
import {Observable, Subject} from "rxjs";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  offers: Offer[] = [];
  pagingInfo: PagingInfo = new PagingInfo();
  pagingInfoChanged: Subject<PagingInfo> = new Subject<PagingInfo>();
  markersOffers: google.maps.Marker[] = [];
  searchDataExpanded: boolean = false;

  constructor(private httpService: HttpService) {
  }

  ngOnInit(): void {
  }

  searchData(searchCriteria: SearchCriteria) {
    /*    this.httpService.getOffers(searchCriteria).subscribe((response: Offer[]) => {
            if (response) {
              this.offers = response;
            }
          },
            (error: any) => {
            console.error('error',error);
          }
        );*/
    this.httpService.getOffers(searchCriteria).subscribe(result => this.offers = result);
    this.offers.forEach(offer => {
      const marker = new google.maps.Marker();
      marker.setTitle(offer.title);
      marker.setPosition(new google.maps.LatLng(offer.location.lat, offer.location.lng));
      marker.set('price', offer.price);
      marker.set('address', offer.address);
      marker.set('thumbnail', offer.photos[0]);
      marker.set('publishDate', offer.publishDate);
      this.markersOffers.push(marker);
    });
  }

  searchCriteriaChanged(pagingInfo: PagingInfo) {
    if (pagingInfo) {
      this.pagingInfo = pagingInfo;
      this.pagingInfoChanged.next(pagingInfo);
    }
  }

  searchBarExpanded(expanded: boolean) {
    this.searchDataExpanded = expanded;
  }
}
