import { BaseModel } from "../../shared/base-model.model";

export interface InspectionPoint extends BaseModel {
    InspectionPointId: number;
    Name? : string;
    Description? : string;
    Remark? : string;
}
