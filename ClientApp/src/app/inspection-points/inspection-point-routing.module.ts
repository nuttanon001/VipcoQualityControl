//Angular Core
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//Components
import { InspectionCenterComponent } from './inspection-center.component';
import { InspectionMasterComponent } from './inspection-master/inspection-master.component';

const routes: Routes = [
  {
    path: "",
    component: InspectionCenterComponent,
    children: [
      {
        path: ":key",
        component: InspectionMasterComponent,
      },
      {
        path: "",
        component: InspectionMasterComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InspectionPointRoutingModule { }
