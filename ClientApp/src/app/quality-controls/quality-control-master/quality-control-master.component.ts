import { Component, ViewContainerRef, ViewChild } from "@angular/core";
// components
import { BaseMasterComponent } from "../../shared/base-master-component";
// models
import { QualityControl } from "../shared/quality-control.model";
// services
import { AuthService } from "../../core/auth/auth.service";
import { DialogsService } from "../../dialogs/shared/dialogs.service";
import { QualityControlService, QualityControlCommunicateService } from "../shared/quality-control.service";
// timezone
import * as moment from "moment-timezone";
import { QualityControlTableComponent } from "../quality-control-table/quality-control-table.component";

@Component({
  selector: 'app-quality-control-master',
  templateUrl: './quality-control-master.component.html',
  styleUrls: ['./quality-control-master.component.scss']
})
export class QualityControlMasterComponent extends BaseMasterComponent<QualityControl, QualityControlService> {

  /** require-painting-master ctor */
  constructor(
    service: QualityControlService,
    serviceCom: QualityControlCommunicateService,
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

  @ViewChild(QualityControlTableComponent)
  private tableComponent: QualityControlTableComponent;

  // on change time zone befor update to webapi
  changeTimezone(value: QualityControl): QualityControl {
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
