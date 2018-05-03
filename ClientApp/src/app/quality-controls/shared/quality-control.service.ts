import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
// services
import { HttpErrorHandler } from "../../shared/http-error-handler.service"
// models
import { QualityControl } from "./quality-control.model";
// Base-Services
import { BaseRestService } from "../../shared/base-rest.service";
import { BaseCommunicateService } from "../../shared/base-communicate.service";
// rxjs
import { Observable } from "rxjs/Observable";
import { catchError } from "rxjs/operators";

@Injectable()
export class QualityControlService extends BaseRestService<QualityControl> {
  constructor(
    http: HttpClient,
    httpErrorHandler: HttpErrorHandler
  ) {
    super(
      http,
      "api/QualityControlResult/",
      "QualityControlService",
      "QualityControlResultId",
      httpErrorHandler
    )
  }
}

@Injectable()
export class QualityControlCommunicateService extends BaseCommunicateService<QualityControl> {
  constructor() { super(); }
}

