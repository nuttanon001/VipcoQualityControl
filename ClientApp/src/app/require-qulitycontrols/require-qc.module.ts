import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
//Modules
import { RequireQcRoutingModule } from './require-qc-routing.module';
import { CustomMaterialModule } from '../shared/customer-material/customer-material.module';
//Components
import { RequireQcCenterComponent } from './require-qc-center.component';
import { RequireQcTableComponent } from './require-qc-table/require-qc-table.component';
import { RequireQcMasterComponent } from './require-qc-master/require-qc-master.component';
import { RequireQcViewComponent } from './require-qc-view/require-qc-view.component';
import { RequireQcEditComponent } from './require-qc-edit/require-qc-edit.component';
import { RequireQcMasterlistTableComponent } from './require-qc-masterlist-table/require-qc-masterlist-table.component';
//Services
import { BranchService } from '../branchs/shared/branch.service';
import { WorkActivityService } from '../work-activities/shared/work-activity.service';
import { EmployeeGroupMisService } from '../employees/shared/employee-group-mis.service';
import { WorkGroupQcService } from '../workgroup-qulitycontrols/shared/workgroup-qc.service';
import { InspectionPointService } from '../inspection-points/shared/inspection-point.service';
import { RequireQualityControlService, RequireQualityControlCommunicateService } from './shared/require-qc.service';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CustomMaterialModule,
    RequireQcRoutingModule
  ],
  declarations: [
    RequireQcCenterComponent,
    RequireQcTableComponent,
    RequireQcMasterComponent,
    RequireQcViewComponent,
    RequireQcEditComponent,
    RequireQcMasterlistTableComponent
  ],
  providers: [
    WorkActivityService,
    WorkGroupQcService,
    InspectionPointService,
    EmployeeGroupMisService,
    BranchService,
    RequireQualityControlService,
    RequireQualityControlCommunicateService
  ]
})
export class RequireQcModule { }
