import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { City, Country } from "../../_models";

@Injectable({
  providedIn: 'root'
})
export class MapService {
  
  constructor(private http : HttpClient) { }

  getAllCities():Observable<City[]>{
    const url : string = `${environment.apiUrl}city/?Name=`;
    let options = {
      headers : new HttpHeaders().set('Content-Type', 'application/json')
    }
    return this.http.get<City[]>(url, options);
  }
  getAllCountries():Observable<Country[]>{
    const url : string = `${environment.apiUrl}country/?Name=`;
    let options = {
      headers : new HttpHeaders().set('Content-Type', 'application/json')
    }
    return this.http.get<Country[]>(url, options);
  }
}
