import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Components
import { WorkActivityCenterComponent } from './work-activity-center.component';
import { WorkActivityMasterComponent } from './work-activity-master/work-activity-master.component';

const routes: Routes = [
  {
    path: "",
    component: WorkActivityCenterComponent,
    children: [
      {
        path: ":key",
        component: WorkActivityMasterComponent,
      },
      {
        path: "",
        component: WorkActivityMasterComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkActivityRoutingModule { }
