import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent,ExtendDicPremadeComponent  } from './_components';
import { AuthGuard } from "./_guards";

const routes: Routes = [
  {
    path : '',
    redirectTo : 'home',
    pathMatch : 'full'
  },
  
  {
    path : 'home',
    component : HomeComponent,
    //canActivate : [AuthGuard]
  }
,
  {
    path : 'ex_dic_pre',
    component : ExtendDicPremadeComponent,
    canActivate : [AuthGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
