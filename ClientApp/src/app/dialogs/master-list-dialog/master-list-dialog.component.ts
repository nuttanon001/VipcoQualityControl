// angular
import { Component, ViewContainerRef, OnInit, Inject, } from "@angular/core";
import { FormBuilder, FormControl, Validators, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
// models
import { MasterList } from "../../master-lists/shared/master-list.model";
// services
import { MasterListService } from "../../master-lists/shared/master-list.service";

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
    @Inject(MAT_DIALOG_DATA) public mode: number
  ) { }

  //Parameter
  masterLists: Array<MasterList>;
  masterList: MasterList;
  editValueForm: FormGroup;

  ngOnInit():void {
    this.buildForm();
  }

  getMasterList(): void {
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
          Validators.required
        ]
      ],
      Length: [this.masterList.Length],
      Width: [this.masterList.Width],
      Heigth: [this.masterList.Heigth],
      Weigth: [this.masterList.Weigth],
      Quantity: [this.masterList.Quantity],
      Revised: [this.masterList.Revised],
      ProjectCodeDetailId: [this.masterList.ProjectCodeDetailId],
      ProjectCodeDetailString: [this.masterList.ProjectCodeDetailString],
      // BaseModel
      Creator: [this.masterList.Creator],
      CreateDate: [this.masterList.CreateDate],
      Modifyer: [this.masterList.Modifyer],
      ModifyDate: [this.masterList.ModifyDate],
    });
  }

  filterStates(makrNo: string) {
    this.service.masterProjectListAutoComplate(makrNo)
      .subscribe(markNoAuto => {
        this.masterLists = new Array;
        this.masterLists = [...markNoAuto];
      });
  }
}
