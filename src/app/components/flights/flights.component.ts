import { Component, TemplateRef } from '@angular/core';
import { FlightService } from '../../services/flight.service';
import * as moment from 'moment';
import { TypeaheadMatch, ModalDirective, BsModalService, BsModalRef } from 'ngx-bootstrap';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgForm } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { mergeMap, catchError, debounceTime, distinctUntilChanged, map, tap, switchMap } from 'rxjs/operators';
import { Flights } from 'src/app/interfaces/flights';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.scss']
})
export class FlightsComponent {

constructor(private flightService: FlightService, private router: Router, private spinner: NgxSpinnerService,
            private bsmodalservice: BsModalService) {}
    modalRef: BsModalRef;
    originCity: string;
    destinationCity: string;
    departureDate: string;
    returnDate: string;
    tripType = 'oneway';
    airline: string;
    seatClass = 'M';
    noOfAdults = 1;
    noOfChildren = 0;
    noOfInfants = 0;

    airports: any[] = [];
    datasource: Observable<any> = of([]);

    departureAirport: any;
    destinationAirport: any;

    flights = [];
    flight: Flights;


  typeaheadOnSelect(e: TypeaheadMatch, type: string): void {
      if (type === 'Departure') {
          this.departureAirport = e.item;
          console.log(this.departureAirport.code);
      }
      if (type === 'Destination') {
          this.destinationAirport = e.item;
          console.log(this.destinationAirport.code);
      }
  }

  onSubmit = function() {
    const flightHeader = {
      departureAirport: this.departureAirport.name,
      destinationAirport: this.destinationAirport.name,
      depatureDate: this.formatDate(this.departureDate),
      arrivalDate: this.formatDate(this.returnDate),
      tripType: this.tripType,
      ticketClass: this.seatClass
      };
    localStorage.setItem('flightHeader', JSON.stringify(flightHeader));
    this.spinner.show();
    this.flightService.getFlights(this.departureAirport.code, this.destinationAirport.code,
      this.formatDate(this.departureDate), this.formatDate(this.returnDate), this.tripType, this.airline,
      this.seatClass, this.noOfAdults, this.noOfChildren, this.noOfInfants)
      .subscribe((searchedFlights) => {
        this.flights = searchedFlights;
        localStorage.setItem('flight', JSON.stringify(searchedFlights.data));
        console.log(this.flights);
        this.spinner.hide();
        this.router.navigate(['/flight_search_result']);
      }, (error) => {
          console.log(error);
      });
  };

checkInput(e: string) {
    if (e.length > 2) {
        this.getAirports(e);
    }
  }

getAirports(token: string) {
    const airports = [];
    this.flightService.retrieveAirports(token).subscribe(
      response => {
      const data = Object.values(response)[0];
      for (const u of data) {
        const airport = u;
        airport.name = airport.name + ' (' + airport.code + ')';
        airports.push(airport);
        if (airports.length === data.length) {
          this.airports = airports;
      }
    }
        },
        error => {
            console.log(error);
        });
}

formatDate(date: string): string {
  const d = moment(date).format('DD/MM/YYYY');
  console.log(d);
  return d;
}

}
