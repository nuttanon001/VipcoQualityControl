import { BaseModel } from "../../shared/base-model.model";
import { MasterList } from "../../master-lists/shared/master-list.model";

export interface RequireQcHasMasterList extends BaseModel {
    RequireHasMasterProjectId: number;
    Quantity?: number;
    PassQuantity?: number;
    // FK
    // MasterProjectList
    MasterProjectListId?: number;
    MasterProjectList?: MasterList;
    // RequireQualityControl
    RequireQualityControlId?: number;
}
