import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {CurrencyPipe} from "../../infrastructure/pipes/currency.pipe";
import {DateFormatPipe} from "../../infrastructure/pipes/date-format.pipe";
import {Offer} from "../../model/offer";
import {AddressWithCoords} from "../../model/address-with-coords";
import {mark} from "@angular/compiler-cli/src/ngtsc/perf/src/clock";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {
  @Input() markers: Array<any> = [];
  mapElement!: any;
  options: google.maps.MapOptions = {};
  map!: google.maps.Map;
  markerOptions = {draggable: false, clickable: true};
  infoWindow: google.maps.InfoWindow = new google.maps.InfoWindow();
  @Input() mapMode: 'standard' | 'preview' | 'addMarker' = 'standard';
  @Input() offer!: Offer;
  @Output() addressUpdated = new EventEmitter<AddressWithCoords>();

  constructor() {
  }

  ngOnInit(): void {
    this.mapElement = document.getElementById('map') as HTMLElement;
    if (this.markers && this.markers.length > 0) {
      this.options.center = {
        lat: Number(this.markers[0].getPosition()?.toJSON().lat),
        lng: Number(this.markers[0].getPosition()?.toJSON().lng)
      };
    } else {
      this.options.center = {lng: 18.677896, lat: 50.288757};
    }
    this.options.zoom = 18;
    this.map = new google.maps.Map(this.mapElement, this.options);
    for (let item of this.markers) {
      const newMarker = new google.maps.Marker({
        map: this.map,
        position: item.getPosition(),
        title: item.getTitle()
      })
      newMarker.set('price', item.get('price'));
      newMarker.set('address', item.get('address'));
      newMarker.set('publishDate', item.get('publishDate'));
      if (this.mapMode === 'standard') {

        newMarker.addListener("click", event => this.centerMap(event.latLng.toJSON()));
        newMarker.addListener("mouseover", event => this.markerShowInfoWindowHandler(newMarker));
        newMarker.addListener("mouseout", event => this.markerHideInfoWindowHandler());
      }
      if (this.mapMode === 'preview') {
        const options = this.options;
        options.draggable = false;
        options.clickableIcons = false;
        this.map.setOptions(options);
        this.markerShowInfoWindowHandler(newMarker);
      }
    }
    if (this.mapMode === 'addMarker') {
      let opt = {map: this.map, position: {lat: 0, lng: 0}};
      if (this.offer && this.offer?.location && this.offer?.location?.lat && this.offer?.location?.lng) {
        const marker = new google.maps.Marker({
          map: this.map,
          position: new google.maps.LatLng(this.offer.location.lat, this.offer.location.lng)
        });
        marker.set('title', this.offer.title ? this.offer.title : 'Brak tytułu');
        marker.set('address', 'Adres otrzymany z API google które niestety jest płatne :('); //this.offer.address
        marker.set('price', this.offer.price);
        marker.set('publishDate', this.offer.publishDate);
        marker.set('thumbnail', this.offer.photos[0]);
        this.markers.push(marker);
        this.markerShowInfoWindowHandler(marker);
        this.centerMap(new google.maps.LatLng(this.offer.location.lat, this.offer.location.lng));
      }
      // const geocoder = new google.maps.Geocoder();
      google.maps.event.addListener(this.map, 'rightclick', (event) => {
        if (this.markers && this.markers.length > 0) {
          const addresWithCoords = new AddressWithCoords();
          addresWithCoords.address = '';
          addresWithCoords.location = opt.position;
          this.addressUpdated.emit(addresWithCoords);
          this.markers.forEach(marker => marker.setMap(null));
          this.markers = [];
        }
      });
      google.maps.event.addListener(this.map, 'click', (event) => {
        if (this.markers && this.markers.length < 1) {
          opt.position = event.latLng.toJSON();
          this.centerMap(opt.position);
          /*      geocoder.geocode({location: opt.position}, (
                  results: google.maps.GeocoderResult[],
                  status: google.maps.GeocoderStatus
                  ) => {*/
          // if (status === 'OK') {
          //   if (results && results[0]) {
          const marker = new google.maps.Marker(opt);
          if (this.offer) {
            marker.set('title', this.offer.title ? this.offer.title : 'Brak tytułu');
            marker.set('address', 'Adres otrzymany z API google które niestety jest płatne :(');
            marker.set('price', this.offer.price);
            //results[0].formatted_address
            marker.set('publishDate', new Date());
            marker.set('thumbnail', this.offer.photos[0]);
            this.markers.push(marker);
            // }
            // }
          }
          if (this.markers && this.markers.length > 0) {
            const newMarker = this.markers[0];
            this.markerShowInfoWindowHandler(newMarker);
            const addresWithCoords = new AddressWithCoords();
            addresWithCoords.address = newMarker.get('address');
            addresWithCoords.location = {...opt.position};
            this.addressUpdated.emit(addresWithCoords);
          }
        }
        // )
        // }

      });

    }
  }

  markerShowInfoWindowHandler(marker: google.maps.Marker) {
    this.infoWindow.setContent(
      '<div class="vertical stretch black-font"><div class="underscore horizontal"> <h2 class="content-centered black-font"> ' +
      marker.getTitle() + '</h2>' +
      '</div>' +
      '<div class="form-field horizontal stretch">' +
      '<img class="thumbnail extra-margin-right10" src="' + (marker.get('thumbnail') ? (marker.get('thumbnail')) : 'favicon.ico') + '">' +
      '<div class="vertical stretch">' +
      '<div class="form-field font-large font-bold">' + new CurrencyPipe().transform(marker.get('price')) + '</div> ' +
      '<div class="form-field horizontal">' + marker.get('address') + '</div>' +
      '<div class="form-field horizontal">Dodano:<div class="spacer"></div>' + new DateFormatPipe().transform(marker.get('publishDate')) + '</div></div>' +
      '</div>');
    this.infoWindow.open(this.map, marker);
  }

  markerHideInfoWindowHandler() {
    this.infoWindow.close();
  }

  ngOnDestroy(): void {
    this.markers.forEach(marker => {
      google.maps.event.clearListeners(marker, 'mouseover');
      google.maps.event.clearListeners(marker, 'mouseout');
    });
  }

  centerMap(latLng: any) {
    this.map.setCenter(latLng);
  }
}
