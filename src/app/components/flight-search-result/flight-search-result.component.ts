import { Component } from '@angular/core';
import { TypeaheadMatch, ModalDirective, BsModalService } from 'ngx-bootstrap';
import { Router } from '@angular/router';
import { FlightService } from '../../services/flight.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Flights } from 'src/app/interfaces/flights';
import * as moment from 'moment';

@Component({
  selector: 'app-flight-search-result',
  templateUrl: './flight-search-result.component.html',
  styleUrls: ['./flight-search-result.component.scss']
})
export class FlightSearchResultComponent {
  flightHeader: any;
  flights: [];
  ngSwitch: any;

constructor(private flightService: FlightService, private router: Router, private spinner: NgxSpinnerService) {
    this.flights = JSON.parse(localStorage.getItem('flight'));
    this.flightHeader = JSON.parse(localStorage.getItem('flightHeader'));
   }

  formateDateMS(date) {
    const d = moment(date, 'DD/MM/YYYY').format('MMM DD, YYYY');
    if (d === 'Invalid date') {
        return date;
    }
    return d;
  }

  sort() {}

  formatTime3(date: number) {
    const d = moment.unix(date).format('HH:mm');
    return d;
  }
  formatDate2(date: number) {
    const d = moment.unix(date).format('MMM DD, YYYY HH:mm');
    return d;
  }

}
