// Angular Core
import { Component } from "@angular/core";
// Components
import { CustomMatTableComponent } from "../../shared/custom-mat-table/custom-mat-table.component";
// Models
import { WorkActivity } from "../shared/work-activity.model";
// Services
import { AuthService } from "../../core/auth/auth.service";
import { WorkActivityService } from "../shared/work-activity.service";

@Component({
  selector: 'app-work-activity-table',
  templateUrl: './work-activity-table.component.html',
  styleUrls: ['./work-activity-table.component.scss']
})

export class WorkActivityTableComponent extends CustomMatTableComponent<WorkActivity, WorkActivityService>{
  // Constructor
  constructor(
    service: WorkActivityService,
    authService: AuthService,
  ) {
    super(service, authService);
    this.displayedColumns = ["select", "Name", "Description"];
  }
}
