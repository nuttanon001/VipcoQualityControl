import { BaseModel } from "../../shared/base-model.model";

export interface WorkActivity extends BaseModel {
    WorkActivityId: number;
    Name ?:string;
    Description ?:string;
    Remark ?:string;
}
