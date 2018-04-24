// Angular Core
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
// Modules
import { WorkActivityRoutingModule } from './work-activity-routing.module';
import { CustomMaterialModule } from '../shared/customer-material/customer-material.module';
// Services
import { WorkActivityService, WorkActivityCommunicateService } from './shared/work-activity.service';
// Components
import { WorkActivityCenterComponent } from './work-activity-center.component';
import { WorkActivityViewComponent } from './work-activity-view/work-activity-view.component';
import { WorkActivityEditComponent } from './work-activity-edit/work-activity-edit.component';
import { WorkActivityTableComponent } from './work-activity-table/work-activity-table.component';
import { WorkActivityMasterComponent } from './work-activity-master/work-activity-master.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CustomMaterialModule,
    WorkActivityRoutingModule
  ],
  declarations: [
    WorkActivityCenterComponent,
    WorkActivityTableComponent,
    WorkActivityMasterComponent,
    WorkActivityViewComponent,
    WorkActivityEditComponent
  ],
  providers: [
    WorkActivityService,
    WorkActivityCommunicateService
  ]
})
export class WorkActivityModule { }
