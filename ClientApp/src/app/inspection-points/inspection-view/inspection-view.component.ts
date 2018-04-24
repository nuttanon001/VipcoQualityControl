// angular
import { Component, Output, EventEmitter, Input } from "@angular/core";
// models
import { InspectionPoint } from "../shared/inspection-point.model";
// components
import { BaseViewComponent } from "../../shared/base-view-component";
// services
@Component({
  selector: 'app-inspection-view',
  templateUrl: '../../shared/base-view-component.html',
  styleUrls: ['./inspection-view.component.scss']
})
export class InspectionViewComponent extends BaseViewComponent<InspectionPoint> {
  constructor(
  ) {
    super();
    this.titelLabel = "Inspection-Point information view";
  }

  // load more data
  onLoadMoreData(inspection: InspectionPoint) {
  }
}
