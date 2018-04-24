// angular
import { Component, ViewContainerRef, ViewChild } from "@angular/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
// models
import { WorkGroupQc } from "../shared/workgroup-qc.model";
// components
import { BaseEditComponent } from "../../shared/base-edit-component";
// services
import { ShareService } from "../../shared/share.service";
import { AuthService } from "../../core/auth/auth.service";
import { DialogsService } from "../../dialogs/shared/dialogs.service";
import { WorkGroupQcService, WorkGroupQcCommunicateService } from "../shared/workgroup-qc.service";

@Component({
  selector: 'app-workgroup-qc-edit',
  templateUrl: '../../shared/base-edit-component.html',
  styleUrls: ['./workgroup-qc-edit.component.scss']
})
export class WorkgroupQcEditComponent extends BaseEditComponent<WorkGroupQc, WorkGroupQcService> {
  constructor(
    service: WorkGroupQcService,
    serviceCom: WorkGroupQcCommunicateService,
    private serviceAuth: AuthService,
    private serviceDialogs: DialogsService,
    private viewContainerRef: ViewContainerRef,
    private fb: FormBuilder
  ) {
    super(
      service,
      serviceCom,
    );
    this.titelLabel = "Workgroup Quailtycontrol form edit"
  }

  // Parameter

  // on get data by key
  onGetDataByKey(value?: WorkGroupQc): void {
    if (value) {
      this.service.getOneKeyNumber(value)
        .subscribe(dbData => {
          this.editValue = dbData;
        }, error => console.error(error), () => this.buildForm());
    } else {
      this.editValue = {
        WorkGroupQualityControlId: 0,
      };
      this.buildForm();
    }
  }

  // build form
  buildForm(): void {
    this.editValueForm = this.fb.group({
      WorkGroupQualityControlId: [this.editValue.WorkGroupQualityControlId],
      Name: [this.editValue.Name,
        [
          Validators.required,
          Validators.maxLength(50)
        ]
      ],
      Description: [this.editValue.Description,
        [
          Validators.maxLength(200),
        ]
      ],
      Remark: [this.editValue.Remark,
        [
          Validators.maxLength(200)
        ]
      ],
      Creator: [this.editValue.Creator],
      CreateDate: [this.editValue.CreateDate],
      Modifyer: [this.editValue.Modifyer],
      ModifyDate: [this.editValue.ModifyDate],
    });

    this.editValueForm.valueChanges.subscribe((data: any) => this.onValueChanged(data));
  }
}
