import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
// services
import { HttpErrorHandler } from "../../shared/http-error-handler.service"
// models
import { WorkActivity } from "./work-activity.model";
// Base-Services
import { BaseRestService } from "../../shared/base-rest.service";
import { BaseCommunicateService } from "../../shared/base-communicate.service";
// rxjs
import { Observable } from "rxjs/Observable";
import { catchError } from "rxjs/operators";

@Injectable()
export class WorkActivityService extends BaseRestService<WorkActivity> {
  constructor(
    http: HttpClient,
    httpErrorHandler: HttpErrorHandler
  ) {
    super(
      http,
      "api/WorkActivity/",
      "WorkActivityService",
      "WorkActivityId",
      httpErrorHandler
    )
  }
}

@Injectable()
export class WorkActivityCommunicateService extends BaseCommunicateService<WorkActivity> {
  constructor() { super(); }
}
