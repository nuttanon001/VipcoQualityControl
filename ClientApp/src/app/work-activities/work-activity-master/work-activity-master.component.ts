import { Component, ViewContainerRef, ViewChild } from "@angular/core";
// components
import { BaseMasterComponent } from "../../shared/base-master-component";
import { WorkActivityTableComponent } from "../work-activity-table/work-activity-table.component";
// models
import { WorkActivity } from "../shared/work-activity.model";
// services
import { AuthService } from "../../core/auth/auth.service";
import { DialogsService } from "../../dialogs/shared/dialogs.service";
import { WorkActivityService, WorkActivityCommunicateService } from "../shared/work-activity.service";
// timezone
import * as moment from "moment-timezone";

@Component({
  selector: 'app-work-activity-master',
  templateUrl: './work-activity-master.component.html',
  styleUrls: ['./work-activity-master.component.scss']
})
export class WorkActivityMasterComponent extends BaseMasterComponent<WorkActivity, WorkActivityService> {

  /** require-painting-master ctor */
  constructor(
    service: WorkActivityService,
    serviceCom: WorkActivityCommunicateService,
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

  @ViewChild(WorkActivityTableComponent)
  private tableComponent: WorkActivityTableComponent;

  // on change time zone befor update to webapi
  changeTimezone(value: WorkActivity): WorkActivity {
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
