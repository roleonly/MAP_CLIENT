import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { City,CityGeomerty,Country } from 'src/app/_models';
import { AuthenticationService, MapService } from 'src/app/_services';
import { MyparcelComponent } from '../../_components/';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  
  mapp:mapboxgl.Map;
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
    this.MapBox();
    
  }


  
  
   MapBox(){
   
    this.mapp = new mapboxgl.Map({
    accessToken: environment.mapbox.accessToken,
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-74.009151, 40.705189],
  
    });

  }

  MapBoxAddLayer(cityMAP:CityGeomerty){
    
      try{
      this.mapp.removeLayer('CityLayer');
      this.mapp.removeSource('CityMAP');
      }catch(e){}
    
    this.mapp.addSource('CityMAP', {
      'type': 'geojson',
      'data':cityMAP['features'][0]['geometry']
    });
    this.mapp.addLayer({
      'id': 'CityLayer',
      'type': 'fill',
      'source': 'CityMAP',
      'paint': {
      'fill-color': 'red',
      'fill-opacity': 0.5
      },
    });
    
    let coordinate=cityMAP['features'][0]['geometry']['coordinates'][0][0][0];
    console.warn(coordinate);
    this.mapp.flyTo({
      center:[coordinate[0],coordinate[1]],
     
      zoom: 6,
      speed: 0.2,
    });
  
  
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
