import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterListRoutingModule } from './master-list-routing.module';
import { MasterListService } from './shared/master-list.service';
import { MasterListCenterComponent } from './master-list-center.component';
import { MasterListTableComponent } from './master-list-table/master-list-table.component';
import { MasterListMasterComponent } from './master-list-master/master-list-master.component';
import { MasterListViewComponent } from './master-list-view/master-list-view.component';
import { MasterListEditComponent } from './master-list-edit/master-list-edit.component';

@NgModule({
  imports: [
    CommonModule,
    MasterListRoutingModule
  ],
  declarations: [MasterListCenterComponent, MasterListTableComponent, MasterListMasterComponent, MasterListViewComponent, MasterListEditComponent],
  providers: [MasterListService]
})
export class MasterListModule { }
