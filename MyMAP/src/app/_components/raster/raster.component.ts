import { Component, Input, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { City,CityGeomerty,Country } from 'src/app/_models';
import { AuthenticationService, MapService } from 'src/app/_services';
import { MyparcelComponent } from '../../_components/';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import { asapScheduler } from 'rxjs';
@Component({
  selector: 'app-raster',
  templateUrl: './raster.component.html',
  styleUrls: ['./raster.component.css']
})
export class RasterComponent implements OnInit {
  isImageLoading:boolean=true;
  imageLoaded:string;
  coordinates:any;
raster:string="";
mapp:mapboxgl.Map;
 



constructor(
  private router : Router,
  private _auth : AuthenticationService,
  private _map : MapService,
  private _Activatedroute:ActivatedRoute
) {

  this._Activatedroute.queryParams.subscribe(
    (res) => {
      this.raster=res['Raster'];
      this._map.getRaster(this.raster).subscribe(
        (x) => {
          this.imageLoaded=x
          
          console.warn(x);
          this.MapBoxAddLayer();

          
          
    
    
    
        });}
      


      
  
  )
  
  
  
  
  

 }

ngOnInit(): void {
  
 
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
image:any;








MapBoxAddLayer(){
    

this.mapp.addSource('radar', {
'type': 'image',
'url': 'https://docs.mapbox.com/mapbox-gl-js/assets/radar.gif',
'coordinates': [
[26.22208333333333,39.47236111111111],
[27,39.47236111111111],
[27,41],
[26.22208333333333,41]
]
});
this.mapp.addLayer({
id: 'radar-layer',
'type': 'raster',
'source': 'radar',
'paint': {
'raster-fade-duration': 0
}
});

}}



