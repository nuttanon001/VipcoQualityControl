// Angular Core
import { Component } from "@angular/core";
// Components
import { CustomMatTableComponent } from "../../shared/custom-mat-table/custom-mat-table.component";
// Models
import { InspectionPoint } from "../shared/inspection-point.model";
// Services
import { AuthService } from "../../core/auth/auth.service";
import { InspectionPointService } from "../shared/inspection-point.service";

@Component({
  selector: 'app-inspection-table',
  templateUrl: './inspection-table.component.html',
  styleUrls: ['./inspection-table.component.scss']
})
export class InspectionTableComponent extends CustomMatTableComponent<InspectionPoint, InspectionPointService>{
  // Constructor
  constructor(
    service: InspectionPointService,
    authService: AuthService,
  ) {
    super(service, authService);
    this.displayedColumns = ["select", "Name", "Description"];
  }
}
