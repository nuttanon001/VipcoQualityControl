// angular
import { Component, ViewContainerRef, OnInit, Inject, } from "@angular/core";
import { FormBuilder, FormControl, Validators, FormGroup, AbstractControl } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
// models
import { MasterList } from "../../master-lists/shared/master-list.model";
// services
import { MasterListService } from "../../master-lists/shared/master-list.service";
import { debounceTime, distinctUntilChanged, switchMap, retry } from "rxjs/operators";
import { filter } from "rxjs/operator/filter";

@Component({
  selector: 'app-master-list-dialog',
  templateUrl: './master-list-dialog.component.html',
  styleUrls: ['./master-list-dialog.component.scss'],
  providers: [MasterListService]
})
export class MasterListDialogComponent implements OnInit {
  constructor(
    private service: MasterListService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<MasterListDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public valueMasterList: MasterList
  ) { }

  //Parameter
  masterLists: Array<MasterList>;
  masterList: MasterList;
  editValueForm: FormGroup;

  ngOnInit(): void {
    if (this.valueMasterList) {
      this.masterList = this.valueMasterList;
    } else {
      this.masterList = {
        MasterProjectListId: 0
      };
    }

    this.buildForm();
  }

  buildForm(): void {
    this.editValueForm = this.fb.group({
      MasterProjectListId: [this.masterList.MasterProjectListId],
      Name: [this.masterList.Name,
      [
        Validators.maxLength(50)
      ]
      ],
      Description: [this.masterList.Description,
      [
        Validators.maxLength(200)
      ]
      ],
      Remark: [this.masterList.Remark],
      DrawingNo: [this.masterList.DrawingNo,
      [
        Validators.maxLength(200)
      ]
      ],
      MarkNo: [this.masterList.MarkNo,
      [
        Validators.required,
        Validators.maxLength(150),
      ]
      ],
      Length: [this.masterList.Length],
      Width: [this.masterList.Width],
      Heigth: [this.masterList.Heigth],
      Weigth: [this.masterList.Weigth],
      Quantity: [this.masterList.Quantity,
        [
          Validators.min(1),
          Validators.required,
        ]
      ],
      Revised: [this.masterList.Revised],
      ProjectCodeDetailId: [this.masterList.ProjectCodeDetailId],
      ProjectCodeDetailString: [this.masterList.ProjectCodeDetailString],
      // BaseModel
      Creator: [this.masterList.Creator],
      CreateDate: [this.masterList.CreateDate],
      Modifyer: [this.masterList.Modifyer],
      ModifyDate: [this.masterList.ModifyDate],
    });

    const ControlMarkNo: AbstractControl | undefined = this.editValueForm.get("MarkNo");
    if (ControlMarkNo) {
      ControlMarkNo.valueChanges
        .pipe(
          debounceTime(500),
          distinctUntilChanged()).subscribe((data: string) => {
            if (data) {
              this.filterMasterList(data);
            } else {
              this.masterLists = new Array;
            }
          });
    }
  }

  filterMasterList(makrNo: string) {
    this.service.masterProjectListAutoComplate(makrNo)
      .subscribe(markNoAuto => {
        this.masterLists = new Array;
        this.masterLists = [...markNoAuto];
      });
  }

  onCancelMasterList(): void {
    this.dialogRef.close();
  }

  onSubmitMasterList(): void {
    if (this.editValueForm) {
      // If Valid is fail
      if (!this.editValueForm.valid) { return; }

      this.masterList = this.editValueForm.value;
      if (this.masterList) {
        this.dialogRef.close(this.masterList);
      }
    }
  }
}
