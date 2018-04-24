import { Component, ViewContainerRef, ViewChild } from "@angular/core";
// components
import { BaseMasterComponent } from "../../shared/base-master-component";
// models
// services
import { AuthService } from "../../core/auth/auth.service";
import { DialogsService } from "../../dialogs/shared/dialogs.service";
// timezone
import * as moment from "moment-timezone";
import { RequireQc } from "../shared/require-qc.model";
import { RequireQualityControlService, RequireQualityControlCommunicateService } from "../shared/require-qc.service";
import { RequireQcTableComponent } from "../require-qc-table/require-qc-table.component";
import { RequireStatusQc } from "../shared/require-status-qc.enum";

@Component({
  selector: 'app-require-qc-master',
  templateUrl: './require-qc-master.component.html',
  styleUrls: ['./require-qc-master.component.scss']
})
export class RequireQcMasterComponent
  extends BaseMasterComponent<RequireQc, RequireQualityControlService> {
  constructor(
    service: RequireQualityControlService,
    serviceCom: RequireQualityControlCommunicateService,
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

  @ViewChild(RequireQcTableComponent)
  private tableComponent: RequireQcTableComponent;
  // on change time zone befor update to webapi
  changeTimezone(value: RequireQc): RequireQc {
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

  // on detail edit override
  onDetailEdit(editValue?: RequireQc): void {
    if (editValue) {
      if (editValue.RequireStatus !== RequireStatusQc.Waiting) {
        this.dialogsService.error("Access Deny", "คำขอตรวจสอบคุณภาพ อยู่ขณะดำเนินการไม่สามารถแก้ไขได้ !!!", this.viewContainerRef);
        return;
      }
    }
    super.onDetailEdit(editValue);
  }

  //============== OverRide =================//
  // on insert data
  onInsertToDataBase(value: RequireQc): void {
    if (this.authService.getAuth) {
      value["Creator"] = this.authService.getAuth.UserName || "";
    }
    let attachs: FileList | undefined = value.AttachFile;
    // change timezone
    value = this.changeTimezone(value);
    // insert data
    this.service.addModel(value).subscribe(
      (complete: any) => {
        if (complete && attachs) {
          this.onAttactFileToDataBase(complete.RequireQualityControlId, attachs, complete.Creator || "");
        }

        if (complete) {
          this.displayValue = complete;
          this.onSaveComplete();
        } else {
          this.editValue.Creator = undefined;
          this.canSave = true;
          this.dialogsService.error("Failed !",
            "Save failed with the following error: Invalid Identifier code !!!", this.viewContainerRef);
        }
      },
      (error: any) => {
        console.error(error);
        this.editValue.Creator = undefined;
        this.canSave = true;
        this.dialogsService.error("Failed !",
          "Save failed with the following error: Invalid Identifier code !!!", this.viewContainerRef);
      }
    );
  }

  // on update data
  onUpdateToDataBase(value: RequireQc): void {
    if (this.authService.getAuth) {
      value["Modifyer"] = this.authService.getAuth.UserName || "";
    }
    let attachs: FileList | undefined = value.AttachFile;
    // remove attach
    if (value.RemoveAttach) {
      this.onRemoveFileFromDataBase(value.RemoveAttach);
    }
    // change timezone
    value = this.changeTimezone(value);
    // update data
    this.service.updateModelWithKey(value).subscribe(
      (complete: any) => {
        if (complete && attachs) {
          this.onAttactFileToDataBase(complete.RequireQualityControlId, attachs, complete.Modifyer || "Someone");
        }
        if (complete) {
          this.displayValue = complete;
          this.onSaveComplete();
        } else {
          this.canSave = true;
          this.dialogsService.error("Failed !",
            "Save failed with the following error: Invalid Identifier code !!!", this.viewContainerRef);
        }
      },
      (error: any) => {
        console.error(error);
        this.canSave = true;
        this.dialogsService.error("Failed !",
          "Save failed with the following error: Invalid Identifier code !!!", this.viewContainerRef);
      }
    );
  }

  // Attach
  // on attact file
  onAttactFileToDataBase(RequireQualityControlId: number, Attacts: FileList, CreateBy: string): void {
    this.service.postAttactFile(RequireQualityControlId, Attacts, CreateBy)
      .subscribe(complate => console.log("Upload Complate"), error => console.error(error));
  }

  // on remove file
  onRemoveFileFromDataBase(Attachs: Array<number>): void {
    Attachs.forEach((value: number) => {
      this.service.deleteAttactFile(value)
        .subscribe(complate => console.log("Delete Complate"), error => console.error(error));
    });
  }
}
