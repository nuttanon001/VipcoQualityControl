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
import { LocationDialogComponent } from './location-dialog/location-dialog.component';
import { LocationTableComponent } from './location-dialog/location-table/location-table.component';
import { LocationEditComponent } from './location-dialog/location-edit/location-edit.component';
import { RequireQcDialogComponent } from './require-qc-dialog/require-qc-dialog.component';
import { RequireQcViewExtendComponent } from './require-qc-dialog/require-qc-view-extend.component';
import { RequireQcChangeDialogComponent } from './require-qc-dialog/require-qc-change-dialog.component';

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
    MasterListDialogComponent,
    ProjectDetailTableComponent,
    LocationEditComponent,
    LocationTableComponent,
    LocationDialogComponent,
    RequireQcDialogComponent,
    RequireQcViewExtendComponent,
    RequireQcChangeDialogComponent,
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
    LocationEditComponent,
    LocationTableComponent,
    LocationDialogComponent,
    RequireQcDialogComponent,
    RequireQcViewExtendComponent,
    RequireQcChangeDialogComponent,
  ],
})
export class DialogsModule { }
