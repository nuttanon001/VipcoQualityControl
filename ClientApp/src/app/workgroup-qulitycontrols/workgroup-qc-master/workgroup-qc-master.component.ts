import { Component, ViewContainerRef, ViewChild } from "@angular/core";
// components
import { BaseMasterComponent } from "../../shared/base-master-component";
import { WorkgroupQcTableComponent } from "../workgroup-qc-table/workgroup-qc-table.component";
// models
import { WorkGroupQc } from "../shared/workgroup-qc.model";
// services
import { AuthService } from "../../core/auth/auth.service";
import { DialogsService } from "../../dialogs/shared/dialogs.service";
import { WorkGroupQcService, WorkGroupQcCommunicateService } from "../shared/workgroup-qc.service";
// timezone
import * as moment from "moment-timezone";

@Component({
  selector: 'app-workgroup-qc-master',
  templateUrl: './workgroup-qc-master.component.html',
  styleUrls: ['./workgroup-qc-master.component.scss']
})
export class WorkgroupQcMasterComponent extends BaseMasterComponent<WorkGroupQc, WorkGroupQcService> {

  /** require-painting-master ctor */
  constructor(
    service: WorkGroupQcService,
    serviceCom: WorkGroupQcCommunicateService,
    authService: AuthService,
    dialogsService: DialogsService,
    viewContainerRef: ViewContainerRef,
  ) {
    super(
      service,
      serviceCom,
      authService,
      dialogsService,
      viewContainerRef
    );
  }

  //Parameter
  @ViewChild(WorkgroupQcTableComponent)
  private tableComponent: WorkgroupQcTableComponent;

  // on change time zone befor update to webapi
  changeTimezone(value: WorkGroupQc): WorkGroupQc {
    let zone: string = "Asia/Bangkok";
    if (value !== null) {
      if (value.CreateDate !== null) {
        value.CreateDate = moment.tz(value.CreateDate, zone).toDate();
      }
      if (value.ModifyDate !== null) {
        value.ModifyDate = moment.tz(value.ModifyDate, zone).toDate();
      }
    }
    return value;
  }

  // onReload
  onReloadData(): void {
    this.tableComponent.reloadData();
  }
}
