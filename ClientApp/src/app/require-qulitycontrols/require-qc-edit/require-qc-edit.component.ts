// angular
import { Component, ViewContainerRef, group } from "@angular/core";
import { FormBuilder, FormControl, Validators, AbstractControl } from "@angular/forms";
// models
import { RequireQc } from "../shared/require-qc.model";
import { Branch } from "../../branchs/shared/branch.model";
import { AttachFile } from "../../shared/attach-file.model";
import { RequireStatusQc } from "../shared/require-status-qc.enum";
import { MasterList } from "../../master-lists/shared/master-list.model";
import { WorkActivity } from "../../work-activities/shared/work-activity.model";
import { WorkGroupQc } from "../../workgroup-qulitycontrols/shared/workgroup-qc.model";
import { InspectionPoint } from "../../inspection-points/shared/inspection-point.model";
// components
import { BaseEditComponent } from "../../shared/base-edit-component";
// services
import { AuthService } from "../../core/auth/auth.service";
import { ShareService } from "../../shared/share.service";
import { BranchService } from "../../branchs/shared/branch.service";
import { DialogsService } from "../../dialogs/shared/dialogs.service";
import { WorkActivityService } from "../../work-activities/shared/work-activity.service";
import { EmployeeGroupMisService } from "../../employees/shared/employee-group-mis.service";
import { WorkGroupQcService } from "../../workgroup-qulitycontrols/shared/workgroup-qc.service";
import { InspectionPointService } from "../../inspection-points/shared/inspection-point.service";
import { RequireQualityControlCommunicateService, RequireQualityControlService } from "../shared/require-qc.service";
import { ArgumentOutOfRangeError } from "rxjs";
import { MasterListService } from "../../master-lists/shared/master-list.service";

@Component({
  selector: 'app-require-qc-edit',
  templateUrl: './require-qc-edit.component.html',
  styleUrls: ['./require-qc-edit.component.scss']
})
export class RequireQcEditComponent extends BaseEditComponent<RequireQc, RequireQualityControlService> {
  constructor(
    service: RequireQualityControlService,
    serviceCom: RequireQualityControlCommunicateService,
    private serviceBranch: BranchService,
    private serviceMarkNo: MasterListService,
    private serviceGroupMis: EmployeeGroupMisService,
    private serviceWorkActivity: WorkActivityService,
    private serviceWorkGroupQc: WorkGroupQcService,
    private serviceInspection: InspectionPointService,
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
  indexItem: number;
  branchs: Array<Branch>;
  inspections: Array<InspectionPoint>;
  workActivities: Array<WorkActivity>;
  workGroupQcs: Array<WorkGroupQc>;
  attachFiles: Array<AttachFile>;
  // on get data by key
  onGetDataByKey(value?: RequireQc): void {
    if (value) {
      this.service.getOneKeyNumber(value)
        .subscribe(dbData => {
          this.editValue = dbData;
          //Employee
          this.serviceMarkNo.actionRequireQualityControlHasMarkNo(dbData.RequireQualityControlId)
            .subscribe(RequireQCHasMasterList => {
              this.editValue.MasterLists = new Array;
              if (RequireQCHasMasterList) {
                RequireQCHasMasterList.forEach((item, index) => {
                  this.editValue.MasterLists.push({
                    CreateDate: item.CreateDate,
                    Creator: item.Creator,
                    MarkNo: item.MarkNo,
                    Name: item.Name,
                    Quantity: item.Quantity,
                    MasterProjectListId: item.MasterProjectListId
                  });
                });
                //Patch value to Form
                this.editValueForm.patchValue({
                  MasterLists: this.editValue.MasterLists
                });
              }});
        }, error => console.error(error), () => this.buildForm());
    } else {
      this.editValue = {
        RequireQualityControlId: 0,
        RequireDate: new Date,
        RequireStatus: RequireStatusQc.Waiting,
      };
      if (this.serviceAuth.getAuth) {
        this.editValue.RequireEmp = this.serviceAuth.getAuth.EmpCode;
        this.editValue.RequireEmpString = this.serviceAuth.getAuth.NameThai;
        this.editValue.MailReply = this.serviceAuth.getAuth.MailAddress;
        // Get GroupMIS
        this.getEmployeeGroupMisByEmpCode(this.editValue.RequireEmp);
      }
      this.buildForm();
    }
  }

  // build form
  buildForm(): void {
    //GetData
    this.getBranchs();
    this.getAttach();
    this.getInspectionPoint();
    this.getWorkActivity();
    this.getWorkGroupQualityControl();
    //Form
    this.editValueForm = this.fb.group({
      RequireQualityControlId: [this.editValue.RequireQualityControlId],
      RequireQualityNo: [this.editValue.RequireQualityNo],
      RequireDate: [this.editValue.RequireDate,
        [
          Validators.required,
        ]
      ],
      ResponseDate: [this.editValue.ResponseDate],
      Description: [this.editValue.Description,
        [
          Validators.required,
          Validators.maxLength(250)
        ]
      ],
      Remark: [this.editValue.Remark,
        [
          Validators.maxLength(250)
        ]
      ],
      MailReply: [this.editValue.MailReply],
      RequireStatus: [this.editValue.RequireStatus],
      GroupMIS: [this.editValue.GroupMIS],
      RequireEmp: [this.editValue.RequireEmp],
      ProjectCodeDetailId: [this.editValue.ProjectCodeDetailId],
      WorkGroupQualityControlId: [this.editValue.WorkGroupQualityControlId,
        [
          Validators.required
        ]
      ],
      InspectionPointId: [this.editValue.InspectionPointId,
        [
          Validators.required
        ]
      ],
      WorkActivityId: [this.editValue.WorkActivityId,
        [
          Validators.required
        ]
      ],
      BranchId: [this.editValue.BranchId,
        [
          Validators.required
        ]
      ],
      // BaseModel
      Creator: [this.editValue.Creator],
      CreateDate: [this.editValue.CreateDate],
      Modifyer: [this.editValue.Modifyer],
      ModifyDate: [this.editValue.ModifyDate],
      // ViewModel
      GroupMISString: [this.editValue.GroupMISString,
        [
          Validators.required
        ]
      ],
      RequireEmpString: [this.editValue.RequireEmpString,
        [
          Validators.required
        ]
      ],
      ProjectCodeDetailString: [this.editValue.ProjectCodeDetailString,
        [
          Validators.required
        ]
      ],
      WorkGroupQualityControlString: [this.editValue.WorkGroupQualityControlString],
      InspectionPointString: [this.editValue.InspectionPointString],
      WorkActivityString: [this.editValue.WorkActivityString],
      BranchString: [this.editValue.BranchString],
      RequireStatusString: [this.editValue.RequireStatusString],
      MasterLists: [this.editValue.MasterLists],
      // Attach File
      AttachFile: [this.editValue.AttachFile],
      RemoveAttach: [this.editValue.RemoveAttach],
    });
    this.editValueForm.valueChanges.subscribe((data: any) => this.onValueChanged(data));
  }

  // get branchs
  getBranchs(): void {
    if (!this.branchs) {
      this.branchs = new Array;
    }
    if (this.branchs) {
      this.serviceBranch.getAll()
        .subscribe(dbBranch => {
          this.branchs = [...dbBranch.sort((item1, item2) => {
            if (item1.Name > item2.Name) {
              return 1;
            }
            if (item1.Name < item2.Name) {
              return -1;
            }
            return 0;
          })];

          if (!this.editValue.BranchId) {
            this.editValue.BranchId = this.branchs.find(item => item.Name.toLowerCase() === "vipco2").BranchId || undefined;
            this.editValueForm.patchValue({
              BranchId: this.editValue.BranchId
            });
          }
        })
    }
  }

  // get inspection-point
  getInspectionPoint(): void {
    if (!this.inspections) {
      this.inspections = new Array;
    }

    if (this.inspections) {
      this.serviceInspection.getAll()
        .subscribe(dbInspection => {
          this.inspections = [...dbInspection];
        });
    }
  }

  // get work activity
  getWorkActivity(): void {
    if (!this.workActivities) {
      this.workActivities = new Array;
    }

    if (this.workActivities) {
      this.serviceWorkActivity.getAll()
        .subscribe(dbWorkActivity => {
          this.workActivities = [...dbWorkActivity];
      });
    }
  }

  // get work group quality control
  getWorkGroupQualityControl(): void {
    if (!this.workGroupQcs) {
      this.workGroupQcs = new Array;
    }

    if (this.workGroupQcs) {
      this.serviceWorkGroupQc.getAll()
        .subscribe(dbWorkGroupQc => {
          this.workGroupQcs = [...dbWorkGroupQc];
        });
    }
  }

  // get employee group mis
  getEmployeeGroupMisByEmpCode(EmpCode: string): void {
    if (EmpCode) {
      this.serviceGroupMis.getGroupMinsByEmpCode(EmpCode)
        .subscribe(GroupMis => {
          if (GroupMis) {
            this.editValue.GroupMIS = GroupMis.GroupMis;
            this.editValue.GroupMISString = GroupMis.GroupDesc;
            // Patch data to form
            this.editValueForm.patchValue({
              GroupMIS: this.editValue.GroupMIS,
              GroupMISString: this.editValue.GroupMISString,
            });
          }
        })
    }
  }

  // open dialog
  openDialog(type?: string): void {
    if (type) {
      if (type === "Employee") {
        this.serviceDialogs.dialogSelectEmployee(this.viewContainerRef)
          .subscribe(emp => {
            if (emp) {
              this.editValueForm.patchValue({
                RequireEmp: emp.EmpCode,
                RequireEmpString: `คุณ${emp.NameThai}`,
              });

              this.getEmployeeGroupMisByEmpCode(emp.EmpCode);
            }
          });
      } else if (type === "Project") {
        this.serviceDialogs.dialogSelectProject(this.viewContainerRef, 2)
          .subscribe(project => {
            if (project) {
              if (project.ProjectCodeSub) {
                this.editValueForm.patchValue({
                  ProjectCodeDetailId: project.ProjectCodeSub.ProjectCodeDetailId,
                  ProjectCodeDetailString: `${project.ProjectCode}/${project.ProjectCodeSub.ProjectCodeDetailCode}`,
                });
              }
            }
          });
      } else if (type === "GroupMis") {
        this.serviceDialogs.dialogSelectGroupMis(this.viewContainerRef)
          .subscribe(groupMis => {
            if (groupMis) {
              this.editValueForm.patchValue({
                GroupMIS: groupMis.GroupMis,
                GroupMISString: `${groupMis.GroupDesc}`,
              });
            }
          });
      } 
    }
  }

  // action markno
  actionMarkNo(markNo?: { data: MasterList, option: number }): void {
    if (!this.editValue.MasterLists) {
      this.editValue.MasterLists = new Array;
    }

    let dataMarkNo: MasterList = {
      MasterProjectListId : 0
    };

    if (!markNo) {
      this.indexItem = -1;
    } else {
      this.indexItem = this.editValue.MasterLists.indexOf(markNo.data);

      if (markNo.option === 1) {
        dataMarkNo = Object.assign({}, markNo.data);
      } else {
        this.editValue.MasterLists.splice(this.indexItem, 1);
        this.editValue.MasterLists = this.editValue.MasterLists.slice();
        // Update to form
        this.editValueForm.patchValue({
          MasterLists: this.editValue.MasterLists
        });
        return;
      }
    }

    this.serviceDialogs.dialogCreateMarkNo(this.viewContainerRef, dataMarkNo)
      .subscribe(dialogMarkNo => {
        if (dialogMarkNo) {
          if (this.indexItem > -1) {
            // remove item
            this.editValue.MasterLists.splice(this.indexItem, 1);
          }
          // cloning an object
          this.editValue.MasterLists.push(Object.assign({}, dialogMarkNo));
          this.editValue.MasterLists = this.editValue.MasterLists.slice();
          // Update to form
          this.editValueForm.patchValue({
            MasterLists: this.editValue.MasterLists
          });
          this.onValueChanged();
        } else {
          this.onValueChanged();
        }
      });
  }

  ////////////
  // Module //
  ////////////

  // get attact file
  getAttach(): void {
    if (this.editValue && this.editValue.RequireQualityControlId > 0) {
      this.service.getAttachFile(this.editValue.RequireQualityControlId)
        .subscribe(dbAttach => {
          this.attachFiles = dbAttach.slice();
        }, error => console.error(error));
    }
  }

  // on Attach Update List
  onUpdateAttachResults(results: FileList): void {
    // debug here
    // console.log("File: ", results);
    this.editValue.AttachFile = results;
    // debug here
    // console.log("Att File: ", this.RequirePaintList.AttachFile);

    this.editValueForm.patchValue({
      AttachFile: this.editValue.AttachFile
    });
  }

  // on Attach delete file
  onDeleteAttachFile(attach: AttachFile): void {
    if (attach) {
      if (!this.editValue.RemoveAttach) {
        this.editValue.RemoveAttach = new Array;
      }
      // remove
      this.editValue.RemoveAttach.push(attach.AttachFileId);
      // debug here
      // console.log("Remove :",this.editValue.RemoveAttach);

      this.editValueForm.patchValue({
        RemoveAttach: this.editValue.RemoveAttach
      });
      let template: Array<AttachFile> =
        this.attachFiles.filter((e: AttachFile) => e.AttachFileId !== attach.AttachFileId);

      this.attachFiles = new Array();
      setTimeout(() => this.attachFiles = template.slice(), 50);
    }
  }

  // open file attach
  onOpenNewLink(link: string): void {
    if (link) {
      window.open(link, "_blank");
    }
  }
}
