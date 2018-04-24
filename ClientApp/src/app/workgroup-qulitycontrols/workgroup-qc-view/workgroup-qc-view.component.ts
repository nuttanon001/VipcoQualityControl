// angular
import { Component, Output, EventEmitter, Input } from "@angular/core";
// models
import { WorkGroupQc } from "../shared/workgroup-qc.model";
// components
import { BaseViewComponent } from "../../shared/base-view-component";
// services

@Component({
  selector: 'app-workgroup-qc-view',
  templateUrl: '../../shared/base-view-component.html',
  styleUrls: ['./workgroup-qc-view.component.scss']
})
export class WorkgroupQcViewComponent extends BaseViewComponent<WorkGroupQc> {
  constructor(
  ) {
    super();
    this.titelLabel = "Workgroup Quailtycontrol information view";
  }

  // load more data
  onLoadMoreData(workgroupQc: WorkGroupQc) {
  }
}
