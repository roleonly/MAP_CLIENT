import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { City,Country } from 'src/app/_models';
import { AuthenticationService, MapService } from 'src/app/_services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  allCity : City[]=[];
  allCountry:Country[]=[];
  constructor(
    private router : Router,
    private _auth : AuthenticationService,
    private _map : MapService
  ) { }

  ngOnInit(): void {
    this.getAllCities();
    this.getAllCountries();
  }

   getAllCities(){
    this._map.getAllCities().subscribe(
      (res) => {
        this.allCity = res;
        console.warn(this.allCity);
        
        
      }
    ); 
    
  }

  getAllCountries(){
    this._map.getAllCountries().subscribe(
      (res) => {
        this.allCountry = res;
        console.warn(this.allCountry);
        
        
      }
    ); 
    
  }

  logout(){
    this._auth.logout();
    this.router.navigate(['/login']);
  }

}
