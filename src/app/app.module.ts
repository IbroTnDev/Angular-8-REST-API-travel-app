import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlightService } from './services/flight.service';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AppRoutingModule } from './app-routing.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AppComponent } from './app.component';
import { FlightsComponent } from './components/flights/flights.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlightSearchResultComponent } from './components/flight-search-result/flight-search-result.component';
@NgModule({
  declarations: [
    AppComponent,
    FlightsComponent,
    FlightSearchResultComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    TypeaheadModule.forRoot(),
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule,
    NgxSpinnerModule
  ],
  providers: [FlightService],
  bootstrap: [AppComponent]
})
export class AppModule { }
