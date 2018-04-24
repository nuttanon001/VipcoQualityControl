// Angular Core
import { Component } from "@angular/core";
// Components
import { CustomMatTableComponent } from "../../shared/custom-mat-table/custom-mat-table.component";
// Models
import { WorkGroupQc } from "../shared/workgroup-qc.model";
// Services
import { AuthService } from "../../core/auth/auth.service";
import { WorkGroupQcService } from "../shared/workgroup-qc.service";

@Component({
  selector: 'app-workgroup-qc-table',
  templateUrl: './workgroup-qc-table.component.html',
  styleUrls: ['./workgroup-qc-table.component.scss']
})
export class WorkgroupQcTableComponent extends CustomMatTableComponent<WorkGroupQc, WorkGroupQcService>{
  // Constructor
  constructor(
    service: WorkGroupQcService,
    authService: AuthService,
  ) {
    super(service, authService);
    this.displayedColumns = ["select", "Name", "Description"];
  }
}
