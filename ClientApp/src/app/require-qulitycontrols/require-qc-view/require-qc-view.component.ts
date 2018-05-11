// angular
import { Component, Output, EventEmitter, Input } from "@angular/core";
// models
import { RequireQc } from "../shared/require-qc.model";
import { AttachFile } from "../../shared/attach-file.model";
// components
import { BaseViewComponent } from "../../shared/base-view-component";
// services
import { RequireQualityControlService } from "../shared/require-qc.service";
import { MasterList } from "../../master-lists/shared/master-list.model";
import { MasterListService } from "../../master-lists/shared/master-list.service";
import { fadeInContent } from "@angular/material";

@Component({
  selector: 'app-require-qc-view',
  templateUrl: './require-qc-view.component.html',
  styleUrls: ['./require-qc-view.component.scss']
})
export class RequireQcViewComponent extends BaseViewComponent<RequireQc> {
  constructor(
    private service: RequireQualityControlService,
    private serviceMasterList: MasterListService,
  ) {
    super();
  }
  //Parameter
  attachFiles: Array<AttachFile>;
  masterLists: Array<MasterList>;
  noMasterList: boolean = false;
  @Input() forFail: boolean = false;
  // load more data
  onLoadMoreData(value: RequireQc) {
    this.attachFiles = new Array;
    if (value) {
      this.service.getAttachFile(value.RequireQualityControlId)
        .subscribe(dbAttach => this.attachFiles = dbAttach.slice());

      if (!this.noMasterList) {
        this.serviceMasterList.actionRequireQualityControlHasMarkNo(value.RequireQualityControlId,
          this.forFail ? "GetMasterProjectListByRequireQualityControlForFail" : "GetMasterProjectListByRequireQualityControl" )
          .subscribe(dbMaster => this.displayValue.MasterLists = dbMaster.slice());
      }
    }
  }
}

