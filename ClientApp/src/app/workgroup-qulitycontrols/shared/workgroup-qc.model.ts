import { BaseModel } from "../../shared/base-model.model";

export interface WorkGroupQc extends BaseModel {
    WorkGroupQualityControlId : number;
    Name? : string;
    Description? : string;
    Remark? : string;
}
