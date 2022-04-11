import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { City, CityGeomerty, Country } from "../../_models";

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
  getCityGeometry(cityname:string):Observable<CityGeomerty>{
    const url : string = `${environment.apiUrl}city/?Name=${cityname}`;
    let options = {
      headers : new HttpHeaders().set('Content-Type', 'application/json')
    }
    return this.http.get<CityGeomerty>(url, options);
  }

  getRaster(cityname:string):Observable<any>{
    const url : string = `${environment.apiUrl}raster/?name=${cityname}`;
    let options = {
      headers : new HttpHeaders().set('Content-Type', 'application/json')
    }
    //return this.http.get<Blob>(url, options );
    return this.http.get<any>(url, options);
  }
}
