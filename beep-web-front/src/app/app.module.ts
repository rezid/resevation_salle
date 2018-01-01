// Core Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// imports for routing
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';

// imports for angular-calendar
import { CalendarModule } from 'angular-calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarComponent } from './reservation/calendar/calendar.component';

// Services
import { Http, HttpModule, XHRBackend, RequestOptions } from '@angular/http';
import { HttpService } from './core/services/http';
import { AuthService } from './core/services/auth.service';
import { RoomService } from './core/services/room.service';
import { EventService } from './core/services/event.service';
import { ReservationService } from './core/services/reservation.service';

// App component
import { AppComponent } from './app.component';

// Layout Components
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';

// Auth Components
import { LoginComponent } from './auth/component/login/login.component';
import { SignUpComponent } from './auth/component/sign-up/sign-up.component';

// Home Components
import { HomeComponent } from './home/home.component';

// Other
import { RoomListComponent } from './home/content/room-list/room-list.component';
import { ProfileDropdownComponent } from './layout/header/profile-dropdown/profile-dropdown.component';
import { ContentHeaderComponent } from './home/content/content-header/content-header.component';
import { CustomizeComponent } from './home/content/customize/customize.component';
import { FilterSummaryComponent } from './home/content/filter-summary/filter-summary.component';
import { TaxonsComponent } from './home/sidebar/taxons/taxons.component';
import { ContentComponent } from './home/content/content.component';
import { RoomListItemComponent } from './home/content/room-list/room-list-item/room-list-item.component';
import { BreadcrumbComponent } from './home/breadcrumb/components/breadcrumb/breadcrumb.component';
import { RoomDetailPageComponent } from './room/room-detail-page/room-detail-page.component';
import { RoomPriceInfoComponent } from './room/room-detail-page/room-price-info/room-price-info.component';
import { RoomImagesComponent } from './room/room-detail-page/room-images/room-images.component';
import { RoomDetailsComponent } from './room/room-detail-page/room-details/room-details.component';
import { RoomDescriptionComponent } from './room/room-detail-page/room-description/room-description.component';
import { ReservationComponent } from './reservation/reservation.component';
import { RoomAddPageComponent } from './room/room-add-page/room-add-page.component';


export function httpInterceptor(
  backend: XHRBackend,
  defaultOptions: RequestOptions,
) {
  return new HttpService(backend, defaultOptions);
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ContentComponent,
    TaxonsComponent,
    RoomListComponent,
    RoomListItemComponent,
    FilterSummaryComponent,
    CustomizeComponent,
    ContentHeaderComponent,
    BreadcrumbComponent,
    FooterComponent,
    RoomListComponent,
    RoomDetailPageComponent,
    RoomPriceInfoComponent,
    RoomImagesComponent,
    RoomDetailsComponent,
    RoomDescriptionComponent,
    CalendarComponent,
    ReservationComponent,
    ProfileDropdownComponent,
    LoginComponent,
    SignUpComponent,
    RoomAddPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot(),
    RouterModule.forRoot(routes),
  ],
  providers: [
    AuthService,
    {
      provide: HttpService,
      useFactory: httpInterceptor,
      deps: [XHRBackend, RequestOptions]
    },
    RoomService,
    {
      provide: HttpService,
      useFactory: httpInterceptor,
      deps: [XHRBackend, RequestOptions]
    },
    ReservationService,
    {
      provide: HttpService,
      useFactory: httpInterceptor,
      deps: [XHRBackend, RequestOptions]
    },
    EventService,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
