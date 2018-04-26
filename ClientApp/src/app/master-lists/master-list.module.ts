import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
//Modules
import { MasterListRoutingModule } from './master-list-routing.module';
import { CustomMaterialModule } from '../shared/customer-material/customer-material.module';
//Services
import { MasterListService, MasterListCommunicateService } from './shared/master-list.service';
//Components
import { MasterListCenterComponent } from './master-list-center.component';
import { MasterListTableComponent } from './master-list-table/master-list-table.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CustomMaterialModule,
    MasterListRoutingModule
  ],
  declarations: [
    MasterListCenterComponent,
    MasterListTableComponent,
  ],
  providers: [
    MasterListService,
    MasterListCommunicateService,
  ]
})
export class MasterListModule { }
