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
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule, // Include HttpClientModule here
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
