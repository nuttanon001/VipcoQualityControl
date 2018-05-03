import { Component } from '@angular/core';
// Components
import { RequireQcViewComponent } from '../../require-qulitycontrols/require-qc-view/require-qc-view.component';
import { RequireQualityControlService } from '../../require-qulitycontrols/shared/require-qc.service';
import { MasterListService } from '../../master-lists/shared/master-list.service';

@Component({
  selector: 'app-require-qc-view-extend',
  templateUrl: '../../require-qulitycontrols/require-qc-view/require-qc-view.component.html',
  styleUrls: ['../../require-qulitycontrols/require-qc-view/require-qc-view.component.scss']
})
export class RequireQcViewExtendComponent extends RequireQcViewComponent {
  constructor(
    service: RequireQualityControlService,
    serviceMaster: MasterListService,
  ) {
    super(service, serviceMaster);
  }
}
