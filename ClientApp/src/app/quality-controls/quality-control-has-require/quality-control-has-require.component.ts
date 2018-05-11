//AngularCore
import { Component, OnInit } from '@angular/core';
// Components
import { RequireQcViewComponent } from '../../require-qulitycontrols/require-qc-view/require-qc-view.component';
// Services
import { MasterListService } from '../../master-lists/shared/master-list.service';
import { RequireQualityControlService } from '../../require-qulitycontrols/shared/require-qc.service';
import { fadeInContent } from '@angular/material';

@Component({
  selector: 'app-quality-control-has-require',
  templateUrl: "../../require-qulitycontrols/require-qc-view/require-qc-view.component.html",
  styleUrls: ["../../require-qulitycontrols/require-qc-view/require-qc-view.component.scss"]
})

export class QualityControlHasRequireComponent extends RequireQcViewComponent {
  constructor(
    service: RequireQualityControlService,
    serviceMasterList: MasterListService,
  ) {
    super(service, serviceMasterList);
    this.noMasterList = true;
  }
}
