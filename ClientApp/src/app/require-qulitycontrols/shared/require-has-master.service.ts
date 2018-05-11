import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
// services
import { HttpErrorHandler } from "../../shared/http-error-handler.service";
// models
import { AttachFile } from "../../shared/attach-file.model";
import { RequireQcHasMasterList } from "./require-qc-has-master-list.model";
// Base-Services
import { BaseRestService } from "../../shared/base-rest.service";
import { BaseCommunicateService } from "../../shared/base-communicate.service";
// rxjs
import { Observable } from "rxjs/Observable";
import { catchError } from "rxjs/operators";

@Injectable()
export class RequireHasMasterService extends BaseRestService<RequireQcHasMasterList> {
  constructor(
    http: HttpClient,
    httpErrorHandler: HttpErrorHandler
  ) {
    super(
      http,
      "api/RequireHasMasterProject/",
      "RequireHasMasterService",
      "RequireHasMasterProjectId",
      httpErrorHandler
    )
  }
}

