import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FlightsComponent } from './components/flights/flights.component';
import { FlightSearchResultComponent } from './components/flight-search-result/flight-search-result.component';

const routes: Routes = [
  { path: '', component: FlightsComponent },
  { path: 'flight_search_result', component: FlightSearchResultComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
