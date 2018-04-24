// angular
import { Component, ViewContainerRef, ViewChild } from "@angular/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
// models
import { WorkActivity } from "../shared/work-activity.model";
// components
import { BaseEditComponent } from "../../shared/base-edit-component";
// services
import { AuthService } from "../../core/auth/auth.service";
import { DialogsService } from "../../dialogs/shared/dialogs.service";
import { ShareService } from "../../shared/share.service";
import { WorkActivityService, WorkActivityCommunicateService } from "../shared/work-activity.service";

@Component({
  selector: 'app-work-activity-edit',
  templateUrl: '../../shared/base-edit-component.html',
  styleUrls: ['./work-activity-edit.component.scss']
})
export class WorkActivityEditComponent extends BaseEditComponent<WorkActivity, WorkActivityService> {
  constructor(
    service: WorkActivityService,
    serviceCom: WorkActivityCommunicateService,
    private serviceAuth: AuthService,
    private serviceDialogs: DialogsService,
    private viewContainerRef: ViewContainerRef,
    private fb: FormBuilder
  ) {
    super(
      service,
      serviceCom,
    );
    this.titelLabel = "Work-Activity form edit"
  }

  // Parameter

  // on get data by key
  onGetDataByKey(value?: WorkActivity): void {
    if (value) {
      this.service.getOneKeyNumber(value)
        .subscribe(dbData => {
          this.editValue = dbData;
        }, error => console.error(error), () => this.buildForm());
    } else {
      this.editValue = {
        WorkActivityId: 0,
      };
      this.buildForm();
    }
  }

  // build form
  buildForm(): void {
    this.editValueForm = this.fb.group({
      WorkActivityId: [this.editValue.WorkActivityId],
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
