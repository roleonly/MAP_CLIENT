import { Component, OnInit, ViewChild } from '@angular/core';
import { parcel } from 'src/app/_models';
import { ParcelService } from 'src/app/_services';

import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-extend-dic-premade',
  templateUrl: './extend-dic-premade.component.html',
  styleUrls: ['./extend-dic-premade.component.css']
})
export class ExtendDicPremadeComponent implements OnInit {

  displayedColumns = [ 'name','actions'];
  parcels_user=new MatTableDataSource<parcel>();
  parcels_city:parcel[]=[];
  parcels_country:parcel[]=[];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatTable, { static: false }) table: MatTable<parcel>;

  constructor(
    private _parcelService: ParcelService,
    public dialog: MatDialog,
    
  ) { }
  
  

  ngOnInit(): void {
    this.get_parcels();
   

  }
  
  get_parcels()
  {
    this._parcelService.get_user_parcel("").subscribe(
      (data:parcel[])=>{
        
        this.parcels_user.data=data;
        this.parcels_user.paginator = this.paginator;
        this.parcels_user.sort = this.sort;
        
      }
    )
    this._parcelService.get_city_parcel("").subscribe(
      (data:parcel[])=>{
        this.parcels_city=data;
        console.warn(this.parcels_city);
      }
    )
    this._parcelService.get_country_parcel("").subscribe(
      (data:parcel[])=>{
        this.parcels_country=data;
       

        console.warn(this.parcels_country);
      }
    )

  }

  deleteUserParcel(i:number ,id:number,name:string)
  {
    console.warn(id)
  }
 refresh(){}
}
