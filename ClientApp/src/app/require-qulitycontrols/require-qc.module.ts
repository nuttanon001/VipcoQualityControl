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
// import { RequireQcMasterlistTableComponent } from './require-qc-masterlist-table/require-qc-masterlist-table.component';
//Services
import { BranchService } from '../branchs/shared/branch.service';
import { MasterListService } from '../master-lists/shared/master-list.service';
import { WorkActivityService } from '../work-activities/shared/work-activity.service';
import { EmployeeGroupMisService } from '../employees/shared/employee-group-mis.service';
import { WorkGroupQcService } from '../workgroup-qulitycontrols/shared/workgroup-qc.service';
import { InspectionPointService } from '../inspection-points/shared/inspection-point.service';
import { RequireQualityControlService, RequireQualityControlCommunicateService } from './shared/require-qc.service';
import { RequireQcWaitingComponent } from './require-qc-waiting/require-qc-waiting.component';
import { SharedModule } from "../shared/shared.module";
import { RequireHasMasterService } from './shared/require-has-master.service';
import { RequireQcFailEditComponent } from './require-qc-fail-edit/require-qc-fail-edit.component';
import { RequireQcScheduleComponent } from './require-qc-schedule/require-qc-schedule.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
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
    RequireQcWaitingComponent,
    RequireQcFailEditComponent,
    RequireQcScheduleComponent,
    // RequireQcMasterlistTableComponent,
  ],
  providers: [
    BranchService,
    MasterListService,
    WorkGroupQcService,
    WorkActivityService,
    InspectionPointService,
    EmployeeGroupMisService,
    RequireQualityControlService,
    RequireQualityControlCommunicateService,
    RequireHasMasterService
  ]
})
export class RequireQcModule { }
