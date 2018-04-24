import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
//Modules
import { CustomMaterialModule } from '../shared/customer-material/customer-material.module';
//Components
import { InspectionPointRoutingModule } from './inspection-point-routing.module';
import { InspectionPointService, InspectionPointCommunicateService } from './shared/inspection-point.service';
import { InspectionCenterComponent } from './inspection-center.component';
import { InspectionTableComponent } from './inspection-table/inspection-table.component';
import { InspectionMasterComponent } from './inspection-master/inspection-master.component';
import { InspectionViewComponent } from './inspection-view/inspection-view.component';
import { InspectionEditComponent } from './inspection-edit/inspection-edit.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CustomMaterialModule,
    InspectionPointRoutingModule
  ],
  declarations: [
    InspectionCenterComponent,
    InspectionTableComponent,
    InspectionMasterComponent,
    InspectionViewComponent,
    InspectionEditComponent
  ],
  providers: [
    InspectionPointService,
    InspectionPointCommunicateService,
  ]
})
export class InspectionPointModule { }
