import { BaseModel } from "../../shared/base-model.model";

export interface MasterList extends BaseModel {
  MasterProjectListId: number;
  Name ? : string;
  Description ? : string;
  Remark ? : string;
  DrawingNo ? : string;
  MarkNo ? : string;
  Length? : number;
  Width? : number;
  Heigth? : number;
  Weigth? : number;
  Quantity? : number;
  Revised? : number;
  //FK
  ProjectCodeDetailId? : number;
  //ViewModel
  ProjectCodeDetailString?: string;
}
