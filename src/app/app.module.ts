import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MainPageComponent} from './main-page/main-page.component';
import {HeaderComponent} from './header/header.component';
import {SearchBarComponent} from './search-bar/search-bar.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ItemListComponent} from './item-list/item-list.component';
import {HttpClientModule} from "@angular/common/http";
import {AddOfferComponent} from './add-offer/add-offer.component';
import {OfferPreviewComponent} from './offer-preview/offer-preview.component';
import {CommonModule} from "@angular/common";
import {CurrencyPipe} from "../infrastructure/pipes/currency.pipe";
import {DateFormatPipe} from "../infrastructure/pipes/date-format.pipe";
import {LoginPageComponent} from './login-page/login-page.component';
import {RegisterPageComponent} from './register-page/register-page.component';
import {LoginPanelComponent} from './login-panel/login-panel.component';
import {ValidatonErrorComponent} from "../infrastructure/controls/validaton-error/validaton-error.component";
import {ValidationErrorIconComponent} from "../infrastructure/controls/validation-error-icon/validation-error-icon.component";
import {MapComponent} from './map/map.component';
import {GoogleMapsModule} from "@angular/google-maps";
import {InfoIconComponent} from "../infrastructure/controls/info-icon/info-icon.component";
import {InfoComponent} from "../infrastructure/controls/info/info.component";
import { UserAccountComponent } from './user-account/user-account.component';
import { UserInboxComponent } from './user-inbox/user-inbox.component';
import { MessageOwnerModalComponent } from './message-owner-modal/message-owner-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    HeaderComponent,
    SearchBarComponent,
    ItemListComponent,
    AddOfferComponent,
    OfferPreviewComponent,
    CurrencyPipe,
    DateFormatPipe,
    LoginPageComponent,
    RegisterPageComponent,
    LoginPanelComponent,
    ValidatonErrorComponent,
    ValidationErrorIconComponent,
    MapComponent,
    InfoIconComponent,
    InfoComponent,
    UserAccountComponent,
    UserInboxComponent,
    MessageOwnerModalComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    GoogleMapsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
