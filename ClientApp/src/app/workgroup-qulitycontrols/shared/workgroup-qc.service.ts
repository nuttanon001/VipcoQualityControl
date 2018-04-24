import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
// services
import { HttpErrorHandler } from "../../shared/http-error-handler.service"
// models
import { WorkGroupQc } from "./workgroup-qc.model";
// Base-Services
import { BaseRestService } from "../../shared/base-rest.service";
import { BaseCommunicateService } from "../../shared/base-communicate.service";
// rxjs
import { Observable } from "rxjs/Observable";
import { catchError } from "rxjs/operators";

@Injectable()
export class WorkGroupQcService extends BaseRestService<WorkGroupQc> {
  constructor(
    http: HttpClient,
    httpErrorHandler: HttpErrorHandler
  ) {
    super(
      http,
      "api/WorkGroupQualityControl/",
      "WorkGroupQcService",
      "WorkGroupQualityControlId",
      httpErrorHandler
    )
  }
}

@Injectable()
export class WorkGroupQcCommunicateService extends BaseCommunicateService<WorkGroupQc> {
  constructor() { super(); }
}
