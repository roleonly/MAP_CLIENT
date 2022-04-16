import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { COMPONENTS,MODULES,PROVIDERS } from "./app.imports";
import { ExtendDicPremadeComponent } from './_components/extend-dic-premade/extend-dic-premade.component';
import { MinimenuComponent } from './_components/minimenu/minimenu.component';



@NgModule({
  declarations: [
    
    COMPONENTS,
    
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
