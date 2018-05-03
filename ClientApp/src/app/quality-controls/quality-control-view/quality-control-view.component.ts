// angular
import { Component, Output, EventEmitter, Input } from "@angular/core";
// models
import { AttachFile } from "../../shared/attach-file.model";
import { QualityControl } from "../shared/quality-control.model";
import { RequireQc } from "../../require-qulitycontrols/shared/require-qc.model";
// components
import { BaseViewComponent } from "../../shared/base-view-component";
// services
import { QualityControlService } from "../shared/quality-control.service";
import { RequireQualityControlService } from "../../require-qulitycontrols/shared/require-qc.service";

@Component({
  selector: 'app-quality-control-view',
  templateUrl: './quality-control-view.component.html',
  styleUrls: ['./quality-control-view.component.scss']
})
export class QualityControlViewComponent extends BaseViewComponent<QualityControl> {
  constructor(
    private service: QualityControlService,
    private serviceRequreQc: RequireQualityControlService,
  ) {
    super();
  }
  //Parameter
  requireQualityControl: RequireQc;
  // load more data
  onLoadMoreData(value: QualityControl) {
    if (value) {
      this.serviceRequreQc.getOneKeyNumber({
        RequireQualityControlId:value.RequireQualityControlId
      }).subscribe(dbRequireQc => this.requireQualityControl = dbRequireQc);
    }
  }
}

