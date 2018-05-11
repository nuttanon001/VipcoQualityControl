import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
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

  // ===================== Over Ride ================================= \\
  /** add Model @param nObject */
  addModel(nObject: QualityControl): Observable<QualityControl> {
    // console.log("Data", JSON.stringify(nObject));

    return this.http.post<QualityControl>(this.baseUrl + "CreateV2/", JSON.stringify(nObject),
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        })
      }).pipe(catchError(this.handleError(this.serviceName + "/post model", nObject)));
  }

  /** update with key number */
  updateModelWithKey(uObject: QualityControl): Observable<QualityControl> {
    return this.http.put<QualityControl>(this.baseUrl + "UpdateV2/", JSON.stringify(uObject), {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
      params: new HttpParams().set("key", uObject[this.keyName].toString())
    }).pipe(catchError(this.handleError(this.serviceName + "/put update model", uObject)));
  }

  // ===================== Quality Control Report ==================== \\
  getQualityControlReport(QualityControlId: number): Observable<any> {
    return this.http.get<any>(this.baseUrl + "QuailtyControlReport/", {
      params: new HttpParams().set("key", QualityControlId.toString())
    }).pipe(catchError(this.handleError(this.serviceName + "/get quality control report", <any>{})));
  }
}

@Injectable()
export class QualityControlCommunicateService extends BaseCommunicateService<QualityControl> {
  constructor() { super(); }
}

