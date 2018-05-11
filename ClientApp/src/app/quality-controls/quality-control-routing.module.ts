import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Components
import { QualityControlCenterComponent } from './quality-control-center.component';
import { QualityControlMasterComponent } from './quality-control-master/quality-control-master.component';
// Services
import { AuthGuard } from '../core/auth/auth-guard.service';

const routes: Routes = [{
  path: "",
  component: QualityControlCenterComponent,
  children: [
    {
      path: ":condition",
      component: QualityControlMasterComponent,
      canActivate: [AuthGuard]
    },
    {
      path: "",
      component: QualityControlMasterComponent,
      canActivate: [AuthGuard]
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QualityControlRoutingModule { }
