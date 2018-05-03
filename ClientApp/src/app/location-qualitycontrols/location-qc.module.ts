//AngularCore
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
//Services
import { LocationQcService } from './shared/location-qc.service';
//Modules
import { CustomMaterialModule } from '../shared/customer-material/customer-material.module';
import { LocationQcRoutingModule } from './location-qc-routing';
//Components
import { LocationQcCenterComponent } from './location-qc-center.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CustomMaterialModule,
    LocationQcRoutingModule,
  ],
  declarations: [
    LocationQcCenterComponent
  ],
  providers: [LocationQcService]
})
export class LocationQcModule { }
