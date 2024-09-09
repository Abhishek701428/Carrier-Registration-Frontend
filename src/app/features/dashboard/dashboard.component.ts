import { Component, OnInit } from '@angular/core';
import { ServiceAuthService } from '../../service/service-auth.service';
import { ChangeDetectorRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-dashboard-list',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  companies: any[] = [];
  newCompany: any = {};


  constructor(
    private serviceAuthService: ServiceAuthService,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService // Inject ToastrService
  ) { }

  ngOnInit(): void {
    this.loadCompany();
  }

  loadCompany() {
    this.serviceAuthService.getAllCompanies().subscribe((data: any) => {
      console.log('Loaded companies:', data); // Verify the data
      this.companies = data;
      this.cdr.detectChanges(); // Trigger change detection
      this.toastr.success('Companies loaded successfully!'); // Success Toastr
    }, error => {
      console.error('Error loading companies:', error);
      this.toastr.error('Failed to load companies.'); // Error Toastr
    });
  }

  onFileChange(event: any, key: string) {
    const file = event.target.files[0];
    if (file) {
      this.newCompany[key] = file;
    }
  }

  submitForm() {
    const formData = new FormData();
    Object.keys(this.newCompany).forEach(key => {
      formData.append(key, this.newCompany[key]);
    });

    this.serviceAuthService.createCompany(formData).subscribe((response: any) => {
      console.log('Company created successfully:', response);
      this.toastr.success('Company created successfully!'); // Success Toastr
      this.loadCompany(); // Reload companies after creation
      this.newCompany = {};
    }, (error: any) => {
      console.error('Error creating company:', error);
      this.toastr.error('Error creating company.'); // Error Toastr
    });
  }
}