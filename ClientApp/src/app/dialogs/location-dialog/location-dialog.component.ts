// angular
import { Component, Inject, ViewChild, OnDestroy } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
// models
import { LocationQc } from "../../location-qualitycontrols/shared/location-qc";
// service
import { LocationQcService } from "../../location-qualitycontrols/shared/location-qc.service";
// rxjs
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
// base-component
import { BaseDialogComponent } from "../../shared/base-dialog.component";

@Component({
  selector: 'app-location-dialog',
  templateUrl: './location-dialog.component.html',
  styleUrls: ['./location-dialog.component.scss'],
  providers: [ LocationQcService ]
})
export class LocationDialogComponent extends BaseDialogComponent<LocationQc, LocationQcService> {
  /** employee-dialog ctor */
  constructor(
    public service: LocationQcService,
    public dialogRef: MatDialogRef<LocationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public mode: number
  ) {
    super(
      service,
      dialogRef
    );
  }
  // Parameter
  locationQc: LocationQc;

  // on init
  onInit(): void {
    this.fastSelectd = true;
  }

  // on new location quality control
  onNewLocationQualityControl(): void {
    this.locationQc = {
      LocationQualityControlId : 0
    };
  }

  // on complate or cancel location quality control
  onComplateOrCancelLocationQc(locationQc?:LocationQc): void {
    if (locationQc) {
      this.service.addModel(locationQc)
        .subscribe(dbData => {
          if (dbData) {
            this.dialogRef.close(dbData);
          }
        });
    } else {
      this.locationQc = undefined;
    }
  }
}
