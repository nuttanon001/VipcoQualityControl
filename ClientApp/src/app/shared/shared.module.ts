import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Module
import { CustomMaterialModule } from './customer-material/customer-material.module';
import { RequireQcMasterlistTableComponent } from '../require-qulitycontrols/require-qc-masterlist-table/require-qc-masterlist-table.component';
// Component
//import { ItemMaintenEmployeeTableComponent } from '../item-maintenances/item-mainten-employee-table/item-mainten-employee-table.component';
//import { ItemMaintenHasRequireComponent } from '../item-maintenances/shared/item-mainten-has-require.component';
//import { ItemMaintenRequisitionTableComponent } from '../item-maintenances/item-mainten-requisition-table/item-mainten-requisition-table.component';

@NgModule({
  imports: [
    CommonModule,
    CustomMaterialModule,
  ],
  declarations: [
    RequireQcMasterlistTableComponent,
    //ItemMaintenEmployeeTableComponent,
    //ItemMaintenHasRequireComponent,
    //ItemMaintenRequisitionTableComponent,
  ],
  exports: [
    RequireQcMasterlistTableComponent,
    //ItemMaintenEmployeeTableComponent,
    //ItemMaintenHasRequireComponent,
    //ItemMaintenRequisitionTableComponent,
  ],
  entryComponents: [
    RequireQcMasterlistTableComponent,
    //ItemMaintenEmployeeTableComponent,
    //ItemMaintenHasRequireComponent,
    //ItemMaintenRequisitionTableComponent,
  ]
})
export class SharedModule { }
