import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { parcel } from "../../_models";
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParcelService {

  constructor(
    private http: HttpClient
  ) { }

  get_user_parcel(id:string):Observable<parcel[]> {
    const url: string = `${environment.apiUrl}parcel/parcel/?id=${id}`;
      let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    }
    return this.http.get<parcel[]>(url, options);
    
  }

  get_country_parcel(id:string) {
    const url: string = `${environment.apiUrl}parcel/country/?id=${id}`;
      let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    }
    return this.http.get<parcel[]>(url, options);
    
  }
  get_city_parcel(id:string) {
    const url: string = `${environment.apiUrl}parcel/city/?id=${id}`;
      let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    }
    return this.http.get<parcel[]>(url, options);
    
  }
}
