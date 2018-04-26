// Angular Core
import { Component } from "@angular/core";
// Components
import { CustomMatTableComponent } from "../../shared/custom-mat-table/custom-mat-table.component";
// Models
import { MasterList } from "../shared/master-list.model";
// Services
import { AuthService } from "../../core/auth/auth.service";
import { MasterListService } from "../shared/master-list.service";

@Component({
  selector: 'app-master-list-table',
  templateUrl: './master-list-table.component.html',
  styleUrls: ['./master-list-table.component.scss']
})
export class MasterListTableComponent extends CustomMatTableComponent<MasterList, MasterListService>{
  // Constructor
  constructor(
    service: MasterListService,
    authService: AuthService,
  ) {
    super(service, authService);
    this.displayedColumns = ["select", "MarkNo", "Name", "Quantity"];
  }
}
