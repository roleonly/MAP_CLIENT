import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { COMPONENTS,MODULES,PROVIDERS } from "./app.imports";

import { MyparcelComponent } from './_components/myparcel/myparcel.component';
import { RasterComponent } from './_components/raster/raster.component';

@NgModule({
  declarations: [
    AppComponent,
    COMPONENTS,
    
    MyparcelComponent,
         RasterComponent
  ],
  imports: [
    MODULES
  ],
  providers: [
    PROVIDERS
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
