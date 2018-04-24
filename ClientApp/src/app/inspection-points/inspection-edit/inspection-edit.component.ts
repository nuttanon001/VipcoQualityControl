// angular
import { Component, ViewContainerRef, ViewChild } from "@angular/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
// models
import { InspectionPoint } from "../shared/inspection-point.model";
// components
import { BaseEditComponent } from "../../shared/base-edit-component";
// services
import { AuthService } from "../../core/auth/auth.service";
import { DialogsService } from "../../dialogs/shared/dialogs.service";
import { ShareService } from "../../shared/share.service";
import { InspectionPointService, InspectionPointCommunicateService } from "../shared/inspection-point.service";

@Component({
  selector: 'app-inspection-edit',
  templateUrl: '../../shared/base-edit-component.html',
  styleUrls: ['./inspection-edit.component.scss']
})
export class InspectionEditComponent extends BaseEditComponent<InspectionPoint, InspectionPointService> {
  constructor(
    service: InspectionPointService,
    serviceCom: InspectionPointCommunicateService,
    private serviceAuth: AuthService,
    private serviceDialogs: DialogsService,
    private viewContainerRef: ViewContainerRef,
    private fb: FormBuilder
  ) {
    super(
      service,
      serviceCom,
    );
    this.titelLabel = "Inspection-Point form edit"
  }

  // Parameter

  // on get data by key
  onGetDataByKey(value?: InspectionPoint): void {
    if (value) {
      this.service.getOneKeyNumber(value)
        .subscribe(dbData => {
          this.editValue = dbData;
        }, error => console.error(error), () => this.buildForm());
    } else {
      this.editValue = {
        InspectionPointId: 0,
      };
      this.buildForm();
    }
  }

  // build form
  buildForm(): void {
    this.editValueForm = this.fb.group({
      InspectionPointId: [this.editValue.InspectionPointId],
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
