//AngularCore
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
//Modules
import { CustomMaterialModule } from '../shared/customer-material/customer-material.module';
import { QualityControlRoutingModule } from './quality-control-routing.module';
//Services
import { QualityControlService, QualityControlCommunicateService } from './shared/quality-control.service';
//Components
import { QualityControlCenterComponent } from './quality-control-center.component';
import { QualityControlTableComponent } from './quality-control-table/quality-control-table.component';
import { QualityControlMasterComponent } from './quality-control-master/quality-control-master.component';
import { QualityControlViewComponent } from './quality-control-view/quality-control-view.component';
import { QualityControlEditComponent } from './quality-control-edit/quality-control-edit.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CustomMaterialModule,
    QualityControlRoutingModule
  ],
  declarations: [
    QualityControlCenterComponent,
    QualityControlTableComponent,
    QualityControlMasterComponent,
    QualityControlViewComponent,
    QualityControlEditComponent
  ],
  providers: [
    QualityControlService,
    QualityControlCommunicateService,
  ]
})
export class QualityControlModule { }
