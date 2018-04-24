// angular
import { Component, Output, EventEmitter, Input } from "@angular/core";
// models
import { WorkActivity } from "../shared/work-activity.model";
// components
import { BaseViewComponent } from "../../shared/base-view-component";
// services

@Component({
  selector: 'app-work-activity-view',
  templateUrl: '../../shared/base-view-component.html',
  styleUrls: ['./work-activity-view.component.scss']
})

export class WorkActivityViewComponent extends BaseViewComponent<WorkActivity> {
  constructor(
  ) {
    super();
    this.titelLabel = "Work-Activity information view";
  }

  // load more data
  onLoadMoreData(workActivity: WorkActivity) {
  }
}
