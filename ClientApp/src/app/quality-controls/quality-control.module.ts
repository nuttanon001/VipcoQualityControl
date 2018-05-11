//AngularCore
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
//Modules
import { SharedModule } from '../shared/shared.module';
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
import { QualityControlHasRequireComponent } from './quality-control-has-require/quality-control-has-require.component';
import { QualityControlHasMarknoTableComponent } from './quality-control-has-markno-table/quality-control-has-markno-table.component';
import { RequireQualityControlService } from '../require-qulitycontrols/shared/require-qc.service';
import { RequireHasMasterService } from '../require-qulitycontrols/shared/require-has-master.service';
import { MasterListService } from '../master-lists/shared/master-list.service';
import { QualityControlReportComponent } from './quality-control-report/quality-control-report.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    CustomMaterialModule,
    QualityControlRoutingModule
  ],
  declarations: [
    QualityControlCenterComponent,
    QualityControlTableComponent,
    QualityControlMasterComponent,
    QualityControlViewComponent,
    QualityControlEditComponent,
    QualityControlHasRequireComponent,
    QualityControlHasMarknoTableComponent,
    QualityControlReportComponent
  ],
  providers: [
    RequireQualityControlService,
    RequireHasMasterService,
    MasterListService,
    QualityControlService,
    QualityControlCommunicateService,
  ]
})
export class QualityControlModule { }
