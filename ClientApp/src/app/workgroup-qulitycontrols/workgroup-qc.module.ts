import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
// Modules
import { WorkgroupQcRoutingModule } from './workgroup-qc-routing.module';
import { CustomMaterialModule } from '../shared/customer-material/customer-material.module';
// Services
import { WorkGroupQcService, WorkGroupQcCommunicateService } from './shared/workgroup-qc.service';
// Components
import { WorkgroupQcCenterComponent } from './workgroup-qc-center.component';
import { WorkgroupQcViewComponent } from './workgroup-qc-view/workgroup-qc-view.component';
import { WorkgroupQcEditComponent } from './workgroup-qc-edit/workgroup-qc-edit.component';
import { WorkgroupQcTableComponent } from './workgroup-qc-table/workgroup-qc-table.component';
import { WorkgroupQcMasterComponent } from './workgroup-qc-master/workgroup-qc-master.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CustomMaterialModule,
    WorkgroupQcRoutingModule
  ],
  declarations: [
    WorkgroupQcCenterComponent,
    WorkgroupQcTableComponent,
    WorkgroupQcMasterComponent,
    WorkgroupQcViewComponent,
    WorkgroupQcEditComponent
  ],
  providers: [
    WorkGroupQcService,
    WorkGroupQcCommunicateService
  ]
})
export class WorkgroupQcModule { }
