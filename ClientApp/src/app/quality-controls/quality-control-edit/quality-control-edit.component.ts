// angular
import { Component, ViewContainerRef, ViewChild } from "@angular/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
// models
import { QualityControl } from "../shared/quality-control.model";
import { RequireQc } from "../../require-qulitycontrols/shared/require-qc.model";
// components
import { BaseEditComponent } from "../../shared/base-edit-component";
// services
import { ShareService } from "../../shared/share.service";
import { AuthService } from "../../core/auth/auth.service";
import { DialogsService } from "../../dialogs/shared/dialogs.service";
import { RequireQualityControlService } from "../../require-qulitycontrols/shared/require-qc.service";
import { RequireHasMasterService } from "../../require-qulitycontrols/shared/require-has-master.service";
import { QualityControlService, QualityControlCommunicateService } from "../shared/quality-control.service";
import { RequireQcHasMasterList } from "../../require-qulitycontrols/shared/require-qc-has-master-list.model";
import { QualityControlStatus } from "../shared/quality-control-status.enum";

@Component({
  selector: 'app-quality-control-edit',
  templateUrl: './quality-control-edit.component.html',
  styleUrls: ['./quality-control-edit.component.scss']
})
export class QualityControlEditComponent extends BaseEditComponent<QualityControl, QualityControlService> {
  constructor(
    service: QualityControlService,
    serviceCom: QualityControlCommunicateService,
    private serviceRequireControl: RequireQualityControlService,
    private serviceRequireHasMaster: RequireHasMasterService,
    private serviceAuth: AuthService,
    private serviceDialogs: DialogsService,
    private viewContainerRef: ViewContainerRef,
    private fb: FormBuilder
  ) {
    super(
      service,
      serviceCom,
    );
  }

  // Parameter
  requireQc: RequireQc;

  // on get data by key
  onGetDataByKey(value?: QualityControl): void {
    if (value && value.QualityControlResultId) {
      this.service.getOneKeyNumber(value)
        .subscribe(dbData => {
          this.editValue = dbData;
        }, error => console.error(error), () => {
          this.buildForm();
          if (this.editValue.RequireQualityControlId) {
            this.serviceRequireControl.getOneKeyNumber({ RequireQualityControlId: this.editValue.RequireQualityControlId })
              .subscribe(dbDataReq => {
                if (dbDataReq) {
                  this.requireQc = dbDataReq;
                  this.getRequireHasMasterList();
                }
              });
          }
        });
    } else {
      this.editValue = {
        QualityControlResultId: 0,
        QualityControlStatus:QualityControlStatus.Processing
      };

      if (this.serviceAuth.getAuth) {
        this.editValue.EmpCode = this.serviceAuth.getAuth.EmpCode;
        this.editValue.EmpQualityControlString = this.serviceAuth.getAuth.NameThai;
      }

      if (value) {
        if (value.RequireQualityControlId) {
          this.editValue.RequireQualityControlId = value.RequireQualityControlId;
          this.serviceRequireControl.getOneKeyNumber({ RequireQualityControlId: this.editValue.RequireQualityControlId })
            .subscribe(dbData => {
              if (dbData) {
                this.requireQc = dbData;
                this.getRequireHasMasterList();
              }
            });
        }
      }
      this.buildForm();
    }
  }

  // build form
  buildForm(): void {
    this.editValueForm = this.fb.group({
      QualityControlResultId: [this.editValue.QualityControlResultId],
      Description: [this.editValue.Description,
        [
          Validators.maxLength(250),
        ]
      ],
      Remark: [this.editValue.Remark,
        [
          Validators.maxLength(250)
        ]
      ],
      QualityControlResultDate: [this.editValue.QualityControlResultDate,
        [
          Validators.required
        ]
      ],
      QualityControlStatus: [this.editValue.QualityControlStatus],
      Creator: [this.editValue.Creator],
      CreateDate: [this.editValue.CreateDate],
      Modifyer: [this.editValue.Modifyer],
      ModifyDate: [this.editValue.ModifyDate],
      //FK
      RequireQualityControlId: [this.editValue.RequireQualityControlId],
      EmpCode: [this.editValue.EmpCode],
      //ViewModel
      EmpQualityControlString: [this.editValue.EmpQualityControlString],
      RequireQualityControlNo: [this.editValue.RequireQualityControlNo],
      WorkGroupQualityControlString: [this.editValue.WorkGroupQualityControlString],
      QualityControlStatusString: [this.editValue.QualityControlStatusString],
      QualityHasMasterLists:[this.editValue.QualityHasMasterLists]
    });
    this.editValueForm.valueChanges.subscribe((data: any) => this.onValueChanged(data));
  }

  // get require has master
  getRequireHasMasterList(): void {
    if (this.editValue) {
      if (this.editValue.RequireQualityControlId) {
        this.serviceRequireHasMaster.getByMasterId(this.editValue.RequireQualityControlId)
          .subscribe(dbMasterLists => {
            dbMasterLists.forEach((item, index) => {
              item.HasFail = !(item.Quantity.toString() === item.PassQuantity.toString());
            });

            this.editValue.QualityHasMasterLists = dbMasterLists.slice();
            this.editValueForm.patchValue({
              QualityHasMasterLists: this.editValue.QualityHasMasterLists,
            });
          });
      }
    }
  }

  // open dialog
  openDialog(type?: string): void {
    if (type) {
      if (type === "RequireQualityControl") {
        this.serviceDialogs.dialogSelectRequireQualityControl(this.requireQc.RequireQualityControlId, this.viewContainerRef, false);
      } 
    }
  }

  // on check pass
  onCheckPass(): void {
    if (this.editValue) {
      if (this.editValue.QualityHasMasterLists) {
        this.editValue.QualityHasMasterLists.forEach((item, index) => {
          if (item) {
            item.PassQuantity = item.Quantity;
          }
        });

        this.editValue.QualityHasMasterLists = this.editValue.QualityHasMasterLists.slice();
        // Update to form
        this.editValueForm.patchValue({
          QualityHasMasterLists: this.editValue.QualityHasMasterLists
        });
      }
    }
  }

  // ItemEmployee remove
  onItemMarkNoChange(anyData?: { data: RequireQcHasMasterList, option: number }): void {
    // console.log("Data is", JSON.stringify(anyData));
    if (anyData) {
      if (anyData.option === 2) {
        // Found Index
        let indexItem: number = this.editValue.QualityHasMasterLists.indexOf(anyData.data);
        // Remove at Index
        if (indexItem !== -1) {
          anyData.data.HasFail = !(anyData.data.Quantity.toString() === anyData.data.PassQuantity.toString());
          this.editValue.QualityHasMasterLists[indexItem] = anyData.data;
        } 
        // Angular need change data for update view
        this.editValue.QualityHasMasterLists = this.editValue.QualityHasMasterLists.slice();
        // Update to form
        this.editValueForm.patchValue({
          QualityHasMasterLists: this.editValue.QualityHasMasterLists
        });
      }
    }
  }
}
