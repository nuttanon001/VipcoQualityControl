// Angular Core
import { Component } from "@angular/core";
// Components
import { CustomMatTableComponent } from "../../../shared/custom-mat-table/custom-mat-table.component";
// Models
import { LocationQc } from "../../../location-qualitycontrols/shared/location-qc";
// Services
import { AuthService } from "../../../core/auth/auth.service";
import { LocationQcService } from "../../../location-qualitycontrols/shared/location-qc.service";

@Component({
  selector: 'app-location-table',
  templateUrl: './location-table.component.html',
  styleUrls: ['./location-table.component.scss']
})
export class LocationTableComponent extends CustomMatTableComponent<LocationQc, LocationQcService>{
  // Constructor
  constructor(
    service: LocationQcService,
    authService: AuthService,
  ) {
    super(service, authService);
    this.displayedColumns = ["select", "Name", "Description"];
  }
}
