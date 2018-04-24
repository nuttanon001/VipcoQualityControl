import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RequireQcCenterComponent } from './require-qc-center.component';
import { RequireQcMasterComponent } from './require-qc-master/require-qc-master.component';

const routes: Routes = [
  {
    path: "",
    component: RequireQcCenterComponent,
    children: [
      {
        path: ":key",
        component: RequireQcMasterComponent,
      },
      {
        path: "",
        component: RequireQcMasterComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequireQcRoutingModule { }
