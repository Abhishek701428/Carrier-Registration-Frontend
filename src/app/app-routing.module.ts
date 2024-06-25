import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { CompanyProfileComponent } from './features/company-profile/company-profile.component';
import { TruckListComponent } from './features/truck-list/truck-list.component';
import { TrailerListComponent } from './features/trailer-list/trailer-list.component';
import { DriverApplicationComponent } from './features/driver-application/driver-application.component';
import { FileManagerComponent } from './features/file-manager/file-manager.component';
import { UsersComponent } from './features/users/users.component';
import { DriverListComponent } from './features/driver-list/driver-list.component';
import { DocumentComponent } from './features/document/document.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', redirectTo: 'company-profile', pathMatch: 'full' },
  { path: 'company-profile', component: CompanyProfileComponent },
  { path: 'truck-list', component: TruckListComponent },
  { path: 'trailer-list', component: TrailerListComponent },
  { path: 'driver-list', component: DriverListComponent},
  { path: 'driver-application', component: DriverApplicationComponent },
  { path: 'file-manager', component: FileManagerComponent },
  { path: 'users', component: UsersComponent },
  { path: 'document', component: DocumentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
