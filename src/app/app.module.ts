import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './features/login/login.component';
import { UsersComponent } from './features/users/users.component';
import { CompanyProfileComponent } from './features/company-profile/company-profile.component';
import { NavbarComponent } from './Component/navbar/navbar.component';
import { FooterComponent } from './Component/footer/footer.component';
import { TruckListComponent } from './features/truck-list/truck-list.component';
import { TrailerListComponent } from './features/trailer-list/trailer-list.component';
import { DriverListComponent } from './features/driver-list/driver-list.component';
import { DriverApplicationComponent } from './features/driver-application/driver-application.component';
import { FileManagerComponent } from './features/file-manager/file-manager.component';
import { DocumentComponent } from './features/document/document.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { TrucklistViewComponent } from './features/truck-list-view/truck-list-view.component';
import { DriverProfileViewComponent } from './features/driver-profile-view/driver-profile-view.component';
import { UsersProfileComponent } from './features/users-profile/users-profile.component';
import { TrailerListViewComponent } from './features/trailer-list-view/trailer-list-view.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UsersComponent,
    CompanyProfileComponent,
    NavbarComponent,
    FooterComponent,
    TruckListComponent,
    TrailerListComponent,
    DriverListComponent,
    DriverApplicationComponent,
    FileManagerComponent,
    DocumentComponent,
    DashboardComponent,
    TrucklistViewComponent,
    DriverProfileViewComponent,
    UsersProfileComponent,
    TrailerListViewComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule, // Include HttpClientModule here
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }), // No need for explicit typing here
    // other modules
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
