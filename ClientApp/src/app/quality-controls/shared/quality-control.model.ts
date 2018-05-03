import { BaseModel } from "../../shared/base-model.model";
import { QualityControlStatus } from "./quality-control-status.enum";

export interface QualityControl extends BaseModel {
  QualityControlResultId: number;
  Description?: string;
  Remark?: string;
  QualityControlResultDate?: Date;
  QualityControlStatus?: QualityControlStatus;
  //FK
  // RequireQualityControl
  RequireQualityControlId?: number;
  // QualityControl Employee
  EmpCode?: string;
  // ViewModel
  EmpQualityControlString?: string;
  RequireQualityControlNo?: string;
  WorkGroupQualityControlString?: string;
  QualityControlStatusString?: string;
}
