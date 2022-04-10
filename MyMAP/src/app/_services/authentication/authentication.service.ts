import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { User } from "../../_models";
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public userSubject: BehaviorSubject<User>;

  constructor(private http: HttpClient) {
    this.userSubject = new BehaviorSubject<User>(null as any);
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  logIn(username: string, password: string) {
    const url: string = `${environment.apiUrl}api/token/`;
    const body: any = { username: username, password: password };
    return this.http.post<any>(url, body)
      .pipe(map(res => {
        const user: User = {
          username: username, access_token: res.access, refresh_token: res.refresh
        };

        this.userSubject.next(user);
        localStorage.setItem('user', JSON.stringify(user));
        return user;
      }));
  }

  refreshToken() {
    const url: string = `${environment.apiUrl}auth/token`;

    const body: any = {
      token : this.userValue.refresh_token
    };

    console.log(body);

    return this.http.post<any>(url, body)
      .pipe(map((token) => {
        const user: User = {
          
          username: this.userValue.username,
          
          access_token: token.access,
          refresh_token: this.userValue.refresh_token
        }
        this.userSubject.next(user);
        localStorage.setItem('user', JSON.stringify(user));
        return user;
      }));
  }

  logout() {
    
      localStorage.removeItem('user');
      this.userSubject.next(null as any);    
  }
}
