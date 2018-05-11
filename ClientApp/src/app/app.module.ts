// Angular Core
import { NgModule } from "@angular/core";
import { HttpModule } from "@angular/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Components
import { AppComponent } from './core/app/app.component';
import { HomeComponent } from './core/home/home.component';
import { NavMenuComponent } from './core/nav-menu/nav-menu.component';
// Modules
import { SharedModule } from "./shared/shared.module";
import { DialogsModule } from "./dialogs/dialog.module";
import { CustomMaterialModule } from "./shared/customer-material/customer-material.module";
// Services
import { ShareService } from "./shared/share.service";
import { AuthService } from "./core/auth/auth.service";
import { MessageService } from "./shared/message.service";
import { AuthGuard } from "./core/auth/auth-guard.service";
import { HttpErrorHandler } from "./shared/http-error-handler.service";
import { LoginComponent } from "./users/login/login.component";
import { RegisterComponent } from "./users/register/register.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavMenuComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    // Angular Core
    HttpModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    // Modules
    DialogsModule,
    CustomMaterialModule,
    //SharedModule,
    // Router
    RouterModule.forRoot([
      { path: "", redirectTo: "home", pathMatch: "full" },
      { path: "home", component: HomeComponent },
      { path: "login", component: LoginComponent },
      { path: "register/:condition", component: RegisterComponent },
      { path: "register", component: RegisterComponent },
      {
        path: "branch",
        loadChildren: './branchs/branch.module#BranchModule',
        canActivate: [AuthGuard],
      },
      {
        path: "inspection",
        loadChildren: './inspection-points/inspection-point.module#InspectionPointModule',
        canActivate: [AuthGuard],
      },
      {
        path: "work-activity",
        loadChildren: './work-activities/work-activity.module#WorkActivityModule',
        canActivate: [AuthGuard],
      },
      {
        path: "workgroup-qc",
        loadChildren: './workgroup-qulitycontrols/workgroup-qc.module#WorkgroupQcModule',
        canActivate: [AuthGuard],
      },
      {
        path: "qualitycontrol",
        loadChildren: './quality-controls/quality-control.module#QualityControlModule',
        canActivate: [AuthGuard],
      },
      {
        path: "require-qc",
        loadChildren: './require-qulitycontrols/require-qc.module#RequireQcModule',
        canActivate: [AuthGuard],
      },
      { path: "**", redirectTo: "home" },
    ]),
  ],
  providers: [
    AuthGuard,
    AuthService,
    ShareService,
    MessageService,
    HttpErrorHandler,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
