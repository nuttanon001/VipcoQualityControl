// Angular Core
import { Component } from "@angular/core";
// Components
import { BaseTableFontData } from "../../shared/base-table-fontdata.component";
// Module
import { RequireQcHasMasterList } from "../../require-qulitycontrols/shared/require-qc-has-master-list.model";
import { Row } from "primeng/primeng";

@Component({
  selector: 'app-quality-control-has-markno-table',
  templateUrl: './quality-control-has-markno-table.component.html',
  styleUrls: ['./quality-control-has-markno-table.component.scss']
})

export class QualityControlHasMarknoTableComponent extends BaseTableFontData<RequireQcHasMasterList> {
  /** custom-mat-table ctor */
  constructor() {
    super();
    this.displayedColumns = ["MarkNoString", "Quantity", "PassQuantity","edit"];
  }

  // on blur
  onBlurPassQuantity(changeValue?:number,rowData?: RequireQcHasMasterList): void {
    if (rowData) {
      if (changeValue > -1) {
        rowData.PassQuantity = changeValue > rowData.Quantity ? rowData.Quantity : changeValue;
      } else {
        rowData.PassQuantity = 0;
      }

      this.returnSelected.emit({
        data: rowData,
        option : 2
      });
    }
  }
}
