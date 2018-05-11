import { Component, ViewContainerRef, ViewChild } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { Location } from "@angular/common";
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
import { QualityControlStatus } from "../shared/quality-control-status.enum";

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
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
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
  backToSchedule: boolean;
  loadReport: boolean = false;
  @ViewChild(QualityControlTableComponent)
  private tableComponent: QualityControlTableComponent;

  // override
  ngOnInit(): void {
    // override class
    super.ngOnInit();
    this.route.paramMap.subscribe((param: ParamMap) => {
      let key: number = Number(param.get("condition") || 0);
      if (key) {
        // can go back to last page
        this.backToSchedule = true;
        let itemMainten: QualityControl = {
          QualityControlResultId: 0,
          RequireQualityControlId: key,
          QualityControlStatus: QualityControlStatus.Processing
        };
        setTimeout(() => {
          this.onDetailEdit(itemMainten);
        }, 500);
      }
    }, error => console.error(error));
  }

  // on detail edit override
  onDetailEdit(editValue?: QualityControl): void {
    if (editValue) {
      if (editValue.QualityControlStatus !== QualityControlStatus.Processing) {
        this.dialogsService.error("Access Deny", "การตรวจสอบคุณภาพ ได้รับการดำเนินการไม่สามารถแก้ไขได้ !!!", this.viewContainerRef);
        return;
      }
    }
    super.onDetailEdit(editValue);
  }

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

  // on show report
  onReport(Value?: QualityControl): void {
    if (Value) {
      this.loadReport = !this.loadReport;
    }
  }

  // on back from report
  onBack(): void {
    this.loadReport = !this.loadReport;
    if (this.backToSchedule) {
      this.location.back();
    }
  }
}
