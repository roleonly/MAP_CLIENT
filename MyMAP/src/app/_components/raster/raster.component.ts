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
  imageLoaded:any;
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









MapBoxAddLayer(){


  let coordinates=[
      
    [this.imageLoaded['coords'][0],   this.imageLoaded['coords'][1]],
    [this.imageLoaded['coords'][0]+(this.imageLoaded['imageW']*0.00027777),   this.imageLoaded['coords'][1]],
    [this.imageLoaded['coords'][0]+(this.imageLoaded['imageW']*0.00027777),   this.imageLoaded['coords'][1]-(this.imageLoaded['imageH']*0.00027777)],
    [this.imageLoaded['coords'][0],   this.imageLoaded['coords'][1]-(this.imageLoaded['imageH']*0.00027777)],


]
console.warn(coordinates);

  this.mapp.addSource('radar', {
    'type': 'image',
    'url': this.imageLoaded['url'],
    'coordinates': coordinates
    
  }
    )
    this.mapp.addLayer({
      id: 'radar-layer',
      'type': 'raster',
      'source': 'radar',
      
      'paint': {
      'raster-fade-duration': 0
      
      }
      });
     
      this.mapp.flyTo({
        center:[this.imageLoaded['coords'][0],   this.imageLoaded['coords'][1]],
       
        zoom: 6,
        speed: 0.5,
      });
//this.mapp.loadImage(
//    this.imageLoaded['url'],
//    (error, image:any) => {
//    if (error) throw error;
//     
//    // Add the image to the map style.
//    this.mapp.addImage('cat', image);
//     
//    // Add a data source containing one point feature.
//    this.mapp.addSource('point', {
//    'type': 'geojson',
//    'data': {
//    'type': 'FeatureCollection',
//    'features': [
//    {
//    'properties': {},
//    'type': 'Feature',
//    'geometry': {
//    'type': 'Point',
//    'coordinates': this.imageLoaded['coords']
//    }
//    }
//    ]
//    }
//    });
//     
//    // Add a layer to use the image to represent the data.
//    this.mapp.addLayer({
//    'id': 'points',
//    'type': 'symbol',
//    'source': 'point', // reference the data source
//    'layout': {
//    'icon-image': 'cat', // reference the image
//    'icon-size': 0.25
//    }
//    });
//    }
//    );
//  
  


   

}
}


