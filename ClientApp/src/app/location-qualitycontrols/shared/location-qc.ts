import { BaseModel } from "../../shared/base-model.model";

export interface LocationQc extends BaseModel {
    LocationQualityControlId: number;
    Name?:string;
    Description?:string;
    //FK
    //EmployeeGroupMis
    GroupMis?:string;
}
