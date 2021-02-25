import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainPageComponent} from "./main-page/main-page.component";
import {AddOfferComponent} from "./add-offer/add-offer.component";
import {OfferPreviewComponent} from "./offer-preview/offer-preview.component";
import {LoginPanelComponent} from "./login-panel/login-panel.component";
import {UserAccountComponent} from "./user-account/user-account.component";
import {UserInboxComponent} from "./user-inbox/user-inbox.component";

const routes: Routes = [
  {path: '', component: MainPageComponent},
  {path: 'add', component: AddOfferComponent},
  {path: 'login', component: LoginPanelComponent},
  {path: 'preview', component: OfferPreviewComponent},
  {path: 'inbox', component: UserInboxComponent},
  {path: 'account', component: UserAccountComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
