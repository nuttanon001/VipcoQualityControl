import { Component, ViewContainerRef, ViewChild } from "@angular/core";
// components
import { BaseMasterComponent } from "../../shared/base-master-component";
import { InspectionTableComponent } from "../inspection-table/inspection-table.component";
// models
import { InspectionPoint } from "../shared/inspection-point.model";
// services
import { AuthService } from "../../core/auth/auth.service";
import { DialogsService } from "../../dialogs/shared/dialogs.service";
import { InspectionPointService, InspectionPointCommunicateService } from "../shared/inspection-point.service";
// timezone
import * as moment from "moment-timezone";

@Component({
  selector: 'app-inspection-master',
  templateUrl: './inspection-master.component.html',
  styleUrls: ['./inspection-master.component.scss']
})
export class InspectionMasterComponent extends BaseMasterComponent<InspectionPoint, InspectionPointService> {

  /** require-painting-master ctor */
  constructor(
    service: InspectionPointService,
    serviceCom: InspectionPointCommunicateService,
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

  @ViewChild(InspectionTableComponent)
  private tableComponent: InspectionTableComponent;

  // on change time zone befor update to webapi
  changeTimezone(value: InspectionPoint): InspectionPoint {
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
