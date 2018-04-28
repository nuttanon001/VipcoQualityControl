// angular core
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
// 3rd party
import "rxjs/Rx";
import "hammerjs";
// services
import { DialogsService } from "./shared/dialogs.service";
// modules
import { CustomMaterialModule } from "../shared/customer-material/customer-material.module";
import { SharedModule } from "../shared/shared.module";
// components
import {
  ConfirmDialog, ContextDialog,
  ErrorDialog, EmployeeDialogComponent,
  GroupmisDialogComponent, 
  ProjectDialogComponent,
  EmployeeTableComponent,
  GroupmisTableComponent, ProjectTableComponent,
} from "./dialog.index";
import { ProjectDetailTableComponent } from './project-dialog/project-detail-table/project-detail-table.component';
import { MasterListDialogComponent } from './master-list-dialog/master-list-dialog.component';

@NgModule({
  imports: [
    // angular
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // customer Module
    SharedModule,
    CustomMaterialModule,
  ],
  declarations: [
    ErrorDialog,
    ConfirmDialog,
    ContextDialog,
    EmployeeDialogComponent,
    EmployeeTableComponent,
    ProjectDialogComponent,
    ProjectTableComponent,
    //WorkgroupDialogComponent,
    GroupmisDialogComponent,
    GroupmisTableComponent,
    ProjectDetailTableComponent,
    MasterListDialogComponent,
  ],
  providers: [
    DialogsService,
  ],
  // a list of components that are not referenced in a reachable component template.
  // doc url is :https://angular.io/guide/ngmodule-faq
  entryComponents: [
    ErrorDialog,
    ConfirmDialog,
    ContextDialog,
    GroupmisTableComponent,
    ProjectDialogComponent,
    EmployeeDialogComponent,
    GroupmisDialogComponent,
    MasterListDialogComponent,
    ProjectDetailTableComponent,
  ],
})
export class DialogsModule { }
