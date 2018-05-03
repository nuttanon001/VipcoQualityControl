// angular
import { Component, OnInit, Inject, Input, Output, EventEmitter} from "@angular/core";
import { FormBuilder, FormControl, Validators, FormGroup, AbstractControl } from "@angular/forms";
// models
import { RequireQcChange } from "../../require-qulitycontrols/shared/require-qc-change";
// services

@Component({
  selector: 'app-require-qc-change-dialog',
  templateUrl: './require-qc-change-dialog.component.html',
  styleUrls: ['./require-qc-change-dialog.component.scss']
})
export class RequireQcChangeDialogComponent implements OnInit {

  constructor(
    private fb:FormBuilder
  ) { }

  //Parameter
  @Input() requireQcChange: RequireQcChange;
  @Output() comfirmOrCancel: EventEmitter<RequireQcChange | undefined> = new EventEmitter<RequireQcChange | undefined>();
  editValueForm: FormGroup;

  ngOnInit(): void {
    if (!this.requireQcChange) {
      this.comfirmOrCancel.emit(undefined);
    } else {
      this.buildForm();
    }
  }

  buildForm(): void {
    this.editValueForm = this.fb.group({
      RequireQualityControlId: [this.requireQcChange.RequireQualityControlId],
      ChangeDate: [this.requireQcChange.ChangeDate,
        [
          Validators.required
        ]
      ],
      ChangeTime: [this.requireQcChange.ChangeTime,
        [
          Validators.required
        ]
      ],
      ChangeTimeString: [this.requireQcChange.ChangeTimeString],
    });
  }

  onCancelRequireQualityControl(): void {
    this.comfirmOrCancel.emit();
  }

  onSubmitRequireQualityControl(): void {
    if (this.editValueForm) {
      // If Valid is fail
      if (!this.editValueForm.valid) { return; }
      this.requireQcChange = this.editValueForm.value;
      if (this.requireQcChange) {
        this.comfirmOrCancel.emit(this.requireQcChange);
      }
    }
  }

}
