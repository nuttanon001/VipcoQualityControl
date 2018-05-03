import { Component, OnInit, Inject, ViewChild } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
// models
import { RequireQc } from "../../require-qulitycontrols/shared/require-qc.model";
import { RequireQcChange } from "../../require-qulitycontrols/shared/require-qc-change";
// services
import { AuthService } from "../../core/auth/auth.service";
import { MasterListService } from "../../master-lists/shared/master-list.service";
import { RequireQualityControlService } from "../../require-qulitycontrols/shared/require-qc.service";

@Component({
  selector: 'app-require-qc-dialog',
  templateUrl: './require-qc-dialog.component.html',
  styleUrls: ['./require-qc-dialog.component.scss'],
  providers: [
    RequireQualityControlService,
    MasterListService
  ]
})
export class RequireQcDialogComponent implements OnInit {
  /** require-painting-view-dialog ctor */
  constructor(
    private service: RequireQualityControlService,
    private serviceAuth: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: { RequireQualityControlId: number, ShowCommand: boolean },
    private dialogRef: MatDialogRef<number>) { }

  // Parameter
  requireQc: RequireQc;
  requireQcChange: RequireQcChange;
  canClose: boolean;

  /** Called by Angular after cutting-plan-dialog component initialized */
  ngOnInit(): void {
    this.canClose = false;
    if (this.data) {
      this.service.getOneKeyNumber({ RequireQualityControlId: this.data.RequireQualityControlId })
        .subscribe(dbData => {
          this.requireQc = dbData;
        }, error => this.onCancelClick());
    } else {
      this.onCancelClick();
    }
  }

  // Selected Value
  onSelectedValue(value?: number): void {
    if (value) {
      this.dialogRef.close(value);
    }
  }

  // No Click
  onCancelClick(mode: number = 0): void {
    if (mode === 0) {
      this.dialogRef.close();
    } else {
      this.dialogRef.close(mode);
    }
  }

  onChangeDateClick(): void {
    this.requireQcChange = {
      RequireQualityControlId: this.requireQc.RequireQualityControlId,
      ChangeDate: new Date(this.requireQc.RequireDate),
      UserName: this.serviceAuth.getAuth.UserName || ""
    };
    if (this.requireQcChange.ChangeDate) {
      this.requireQcChange.ChangeTimeString = this.requireQcChange.ChangeDate.toLocaleTimeString("th-TH", { hour12: false });
      this.requireQcChange.ChangeTime = this.requireQcChange.ChangeTimeString;
    }
  }

  onChangeSubmitOrCancel(onSubmitOrCancel?:RequireQcChange): void {
    if (onSubmitOrCancel) {
      this.service.getRequireQualityControlChange(onSubmitOrCancel)
        .subscribe((complate: any) => {
          if (complate) {
            this.requireQcChange = undefined;
            this.dialogRef.close(2);
          }
        });
    } else {
      this.requireQcChange = undefined;
    }
  }
}
