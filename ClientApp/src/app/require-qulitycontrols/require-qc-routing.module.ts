import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RequireQcCenterComponent } from './require-qc-center.component';
import { RequireQcMasterComponent } from './require-qc-master/require-qc-master.component';
import { RequireQcWaitingComponent } from './require-qc-waiting/require-qc-waiting.component';

const routes: Routes = [
  {
    path: "",
    component: RequireQcCenterComponent,
    children: [
      {
        path: "require-schedule",
        component: RequireQcWaitingComponent,
      },
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
