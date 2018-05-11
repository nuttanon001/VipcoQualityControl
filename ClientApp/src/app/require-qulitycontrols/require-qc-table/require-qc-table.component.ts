// Angular Core
import { Component, Input } from "@angular/core";
// Components
import { CustomMatTableComponent } from "../../shared/custom-mat-table/custom-mat-table.component";
// Models
import { RequireQc } from "../shared/require-qc.model";
// Services
import { AuthService } from "../../core/auth/auth.service";
import { RequireQualityControlService } from "../shared/require-qc.service";

@Component({
  selector: 'app-require-qc-table',
  templateUrl: './require-qc-table.component.html',
  styleUrls: ['./require-qc-table.component.scss']
})

export class RequireQcTableComponent extends CustomMatTableComponent<RequireQc, RequireQualityControlService>{
  // Constructor
  constructor(
    service: RequireQualityControlService,
    authService: AuthService,
  ) {
    super(service, authService);
    this.displayedColumns = ["select", "RequireQualityNo", "InspectionPointString", "RequireDate"];
  }
}
