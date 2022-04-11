import { Component, OnInit,Input, Output,EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { CityGeomerty } from 'src/app/_models';
import { MapService } from 'src/app/_services';

@Component({
  selector: 'app-myparcel',
  templateUrl: './myparcel.component.html',
  styleUrls: ['./myparcel.component.css']
})
export class MyparcelComponent implements OnInit {

  @Output() CityMap=new EventEmitter< CityGeomerty>();
  @Input() name:string;
  
  constructor(
    private _map : MapService,
    private _router : Router
  ) { }
  
  

  ngOnInit(): void {
  }




  onmouseover()
  {
    this._map.getCityGeometry(this.name).subscribe(
      (res) => {
    console.log("mouseover "+ this.name);
    console.warn(res);
    this.CityMap.emit(res);
       
       
      });
  }

  click()
  {
    let data:string;
    this.CityMap.subscribe(
      (res) => {
    

    this._router.navigate(['/raster'], {  queryParams: {  Raster: this.name  } });
      }
    );
    

  }
  

}
