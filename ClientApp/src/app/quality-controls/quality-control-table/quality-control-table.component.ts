// Angular Core
import { Component } from "@angular/core";
// Components
import { CustomMatTableComponent } from "../../shared/custom-mat-table/custom-mat-table.component";
// Models
import { QualityControl } from "../shared/quality-control.model";
// Services
import { AuthService } from "../../core/auth/auth.service";
import { QualityControlService } from "../shared/quality-control.service";

@Component({
  selector: 'app-quality-control-table',
  templateUrl: './quality-control-table.component.html',
  styleUrls: ['./quality-control-table.component.scss']
})
export class QualityControlTableComponent extends CustomMatTableComponent<QualityControl, QualityControlService>{
  // Constructor
  constructor(
    service: QualityControlService,
    authService: AuthService,
  ) {
    super(service, authService);
    this.displayedColumns = ["select", "RequireQualityControlNo", "WorkGroupQualityControlString", "QualityControlResultDate"];
  }
}
