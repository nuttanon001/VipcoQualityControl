// Angular Core
import { Component } from "@angular/core";
// Components
import { BaseTableFontData } from "../../shared/base-table-fontdata.component";
// Module
import { MasterList } from "../../master-lists/shared/master-list.model";

@Component({
  selector: 'app-require-qc-masterlist-table',
  templateUrl: './require-qc-masterlist-table.component.html',
  styleUrls: ['./require-qc-masterlist-table.component.scss']
})
export class RequireQcMasterlistTableComponent extends BaseTableFontData<MasterList> {
  /** custom-mat-table ctor */
  constructor() {
    super();
    this.displayedColumns = ["select", "MarkNo", "Quantity", "edit"];
  }
}
