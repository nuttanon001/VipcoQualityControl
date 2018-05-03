import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
// services
import { HttpErrorHandler } from "../../shared/http-error-handler.service"
// models
import { LocationQc } from "./location-qc";
// Base-Services
import { BaseRestService } from "../../shared/base-rest.service";
import { BaseCommunicateService } from "../../shared/base-communicate.service";
// rxjs
import { Observable } from "rxjs/Observable";
import { catchError } from "rxjs/operators";

@Injectable()
export class LocationQcService extends BaseRestService<LocationQc> {
  constructor(
    http: HttpClient,
    httpErrorHandler: HttpErrorHandler
  ) {
    super(
      http,
      "api/LocationQualityControl/",
      "LocationQcService",
      "LocationQualityControlId",
      httpErrorHandler
    )
  }
}

@Injectable()
export class LocationQcCommunicateService extends BaseCommunicateService<LocationQc> {
  constructor() { super(); }
}
