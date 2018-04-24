import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
// services
import { HttpErrorHandler } from "../../shared/http-error-handler.service"
// models
import { InspectionPoint } from "./inspection-point.model";
// Base-Services
import { BaseRestService } from "../../shared/base-rest.service";
import { BaseCommunicateService } from "../../shared/base-communicate.service";
// rxjs
import { Observable } from "rxjs/Observable";
import { catchError } from "rxjs/operators";

@Injectable()
export class InspectionPointService extends BaseRestService<InspectionPoint> {
  constructor(
    http: HttpClient,
    httpErrorHandler: HttpErrorHandler
  ) {
    super(
      http,
      "api/InspectionPoint/",
      "InspectionPointService",
      "InspectionPointId",
      httpErrorHandler
    )
  }
}

@Injectable()
export class InspectionPointCommunicateService extends BaseCommunicateService<InspectionPoint> {
  constructor() { super(); }
}
