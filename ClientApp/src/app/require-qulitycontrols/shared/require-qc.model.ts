import { BaseModel } from "../../shared/base-model.model";
import { RequireStatusQc } from "./require-status-qc.enum";
import { MasterList } from "../../master-lists/shared/master-list.model";

export interface RequireQc extends BaseModel {
  RequireQualityControlId: number;
  RequireQualityNo? : string;
  RequireDate?: Date;
  ResponseDate?: Date;
  Description?: string;
  Remark?: string;
  MailReply?: string;
  RequireStatus?: RequireStatusQc;
  //FK
  // GroupMis
  GroupMIS? : string;
  // Employee
  RequireEmp? : string;
  // ProjectCodeDetail
  ProjectCodeDetailId? :number;
  //WorkGroupQualityControl
  WorkGroupQualityControlId? :number;
  //InspectionPoint
  InspectionPointId? :number;
  //WorkActivity
  WorkActivityId? :number;
  //Branch
  BranchId?: number;
  //ViewModel
  GroupMISString? :string;
  RequireEmpString? :string;
  ProjectCodeDetailString? :string;
  WorkGroupQualityControlString? :string;
  InspectionPointString? :string;
  WorkActivityString? :string;
  BranchString? :string;
  RequireStatusString?: string;
  MasterLists?: Array<MasterList>;
  // Attach Model
  AttachFile?: FileList;
  RemoveAttach?: Array<number>;
}
