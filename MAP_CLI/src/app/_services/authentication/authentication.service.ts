import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { User } from "../../_models/user";
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

  logIn(user_name: string, password: string) {
    const url: string = `${environment.apiUrl}auth/token/login`;
    const body: any = { username: user_name, password: password };
    return this.http.post<any>(url, body)
      .pipe(map(res => {
        const user: User = {
           username: user_name, access_token: res.access_token, refresh_token: res.refresh_token
        };
        this.userSubject.next(user);
        localStorage.setItem('user', JSON.stringify(user));
        return user;
      }));
  }

  refreshToken() {
    const url: string = `${environment.apiUrl}auth/token/refresh`;

    const body: any = {
      token : this.userValue.refresh_token
    };

    console.log(body);

    return this.http.post<any>(url, body)
      .pipe(map((token) => {
        const user: User = {
          
          username: this.userValue.username,
          access_token: token.access_token,
          refresh_token: this.userValue.refresh_token
        }
        this.userSubject.next(user);
        localStorage.setItem('user', JSON.stringify(user));
        return user;
      }));
  }

  logout() {
    const url: string = `${environment.apiUrl}auth/token/logout/${this.userValue.refresh_token}`;
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    }
    this.http.delete<any>(url, options).subscribe();
      localStorage.removeItem('user');
      this.userSubject.next(null as any);    
  }
}