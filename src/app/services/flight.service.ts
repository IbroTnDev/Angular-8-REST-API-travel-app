import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, retry, catchError, take, switchMap } from 'rxjs/operators';
import { Observable, throwError, of } from 'rxjs';
import { Flights } from '../interfaces/flights';

@Injectable({
  providedIn: 'root'
})
export class FlightService {
  private baseUrl = 'https://api.skypicker.com/flights?';
  private locationUrl = 'https://api.skypicker.com/locations?';
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private options = { headers: this.headers };
  private locationParams = new HttpParams({fromString: '&locale=en-US&location_types=airport&limit=10&active_only=true&sort=name'});

  constructor(private httpClient: HttpClient) { }

  getFlights(originCode: string, destCode: string, departureDate: string,
             returnDate: string, tripType: string, airline: string, cabin: string,
             adults: string, children: string, infants: string) {

    const flightSearchParams = new HttpParams({fromString:
      'fly_from=' + originCode +
      '&fly_to=' + destCode +
      '&date_from=' + departureDate +
      '&date_to=' + returnDate +
      '&flight_type=' + tripType +
      '&select_airlines=' + airline +
      '&selected_cabins=' + cabin +
      '&adults=' + adults +
      '&children=' + children +
      '&infants=' + infants});

    return this.httpClient.get(this.baseUrl + flightSearchParams, this.options).pipe(
        map(response => response));
  }

  retrieveAirports(keyword: string) {
    return this.httpClient.get(this.locationUrl + 'term=' + keyword + this.locationParams).pipe(
    map(response => response));
}

  errorHandler(error: Response) {
    return Observable.throw(error || 'SERVER ERROR');
  }

}
