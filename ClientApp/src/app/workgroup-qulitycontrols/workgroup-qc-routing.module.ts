import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkgroupQcCenterComponent } from './workgroup-qc-center.component';
import { WorkgroupQcMasterComponent } from './workgroup-qc-master/workgroup-qc-master.component';

const routes: Routes = [
  {
    path: "",
    component: WorkgroupQcCenterComponent,
    children: [
      {
        path: ":key",
        component: WorkgroupQcMasterComponent,
      },
      {
        path: "",
        component: WorkgroupQcMasterComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkgroupQcRoutingModule { }
