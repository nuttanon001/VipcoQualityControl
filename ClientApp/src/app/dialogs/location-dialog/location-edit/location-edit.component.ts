// angular
import { Component, OnInit, Input, EventEmitter, Output, } from "@angular/core";
import { FormBuilder, FormControl, Validators, FormGroup, AbstractControl } from "@angular/forms";
// models
import { LocationQc } from "../../../location-qualitycontrols/shared/location-qc";
// services

@Component({
  selector: 'app-location-edit',
  templateUrl: './location-edit.component.html',
  styleUrls: ['./location-edit.component.scss']
})
export class LocationEditComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
  ) { }

  // Parameter
  @Input() locationQc: LocationQc;
  @Output() returnLocationQc: EventEmitter<LocationQc | undefined> = new EventEmitter<LocationQc | undefined>();
  //Form
  editValueForm: FormGroup;
  // OnInit
  ngOnInit() {
    if (this.locationQc) {
      this.buildForm();
    }
  }
  // BuildForm
  buildForm(): void {
    this.editValueForm = this.fb.group({
      MasterProjectListId: [this.locationQc.LocationQualityControlId],
      Name: [this.locationQc.Name,
        [
          Validators.required,
          Validators.maxLength(50)
        ]
      ],
      Description: [this.locationQc.Description,
        [
          Validators.maxLength(200)
        ]
      ],
      GroupMis: [this.locationQc.GroupMis],
      // BaseModel
      Creator: [this.locationQc.Creator],
      CreateDate: [this.locationQc.CreateDate],
      Modifyer: [this.locationQc.Modifyer],
      ModifyDate: [this.locationQc.ModifyDate],
    });
  }
  // On submit
  onSubmit(): void {
    if (this.editValueForm) {
      if (this.editValueForm.valid) {
        this.locationQc = this.editValueForm.value;
        this.returnLocationQc.emit(this.locationQc);
      }
    }
  }
  // On cancel
  onCancel(): void {
    this.returnLocationQc.emit(undefined);
  }
}
