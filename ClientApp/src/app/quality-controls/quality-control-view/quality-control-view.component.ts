// angular
import { Component, Output, EventEmitter, Input } from "@angular/core";
// models
import { QualityControl } from "../shared/quality-control.model";
import { RequireQc } from "../../require-qulitycontrols/shared/require-qc.model";
import { RequireQcHasMasterList } from "../../require-qulitycontrols/shared/require-qc-has-master-list.model";
// components
import { BaseViewComponent } from "../../shared/base-view-component";
// services
import { QualityControlService } from "../shared/quality-control.service";
import { RequireQualityControlService } from "../../require-qulitycontrols/shared/require-qc.service";
import { RequireHasMasterService } from "../../require-qulitycontrols/shared/require-has-master.service";
import { JSONP_ERR_WRONG_RESPONSE_TYPE } from "@angular/common/http/src/jsonp";

@Component({
  selector: 'app-quality-control-view',
  templateUrl: './quality-control-view.component.html',
  styleUrls: ['./quality-control-view.component.scss']
})
export class QualityControlViewComponent extends BaseViewComponent<QualityControl> {
  constructor(
    private serviceRequireQc: RequireQualityControlService,
    private serviceRequireHasMaster: RequireHasMasterService,
  ) {
    super();
  }
  //Parameter
  requireQualityControl: RequireQc;
  requireHasMasters: Array<RequireQcHasMasterList>;
  // load more data
  onLoadMoreData(value: QualityControl) {
    if (value) {
      // Get require quality control
      this.serviceRequireQc.getOneKeyNumber({ RequireQualityControlId: value.RequireQualityControlId })
        .subscribe(dbRequireQc => {
          this.requireQualityControl = dbRequireQc;
        });
      // Get master list
      this.serviceRequireHasMaster.getByMasterId(value.RequireQualityControlId)
        .subscribe(dbHasMasters => {
          dbHasMasters.forEach((item, index) => {
            item.HasFail = !(item.Quantity.toString() === item.PassQuantity.toString());
          });
          this.requireHasMasters = dbHasMasters.slice();
        });
    }
  }
}

