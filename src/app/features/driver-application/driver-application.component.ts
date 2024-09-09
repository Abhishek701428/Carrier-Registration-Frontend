import { Component, OnInit } from '@angular/core';
import { ServiceAuthService } from '../../service/service-auth.service';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-driver-application',
  templateUrl: './driver-application.component.html',
  styleUrl: './driver-application.component.css'
})

export class DriverApplicationComponent implements OnInit {
  driverapplication: any[] = [];
  newDriverapplication: any = {};
  filteredDriverapplication : any[] = [];
  loadDriverapplication: any;

  constructor(private serviceAuthService: ServiceAuthService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loadDriverapplication();
  }

  loadDrivers() {
    this.serviceAuthService.getDriverapplicationFromAPI().subscribe((driverapplication: any) => {
      // console.log(driverapplication)
      this.driverapplication = driverapplication;
      this.filteredDriverapplication = driverapplication;
    }, error => {
      console.error(error);
    });
  }

  filterDriverapplication(filterType: string) {
    // console.log(filterType)
    if (filterType === 'all') {
      this.filteredDriverapplication = this.driverapplication;
    } else if (filterType === 'nonCompliant') {
      this.filteredDriverapplication = this.driverapplication.filter(driverapplication => driverapplication.status === 'APPROVED');
    } else if (filterType === 'compliant') {
      this.filteredDriverapplication = this.driverapplication.filter(driverapplication => driverapplication.status === 'PENDING');
    } else if (filterType === 'expiring') {
      this.filteredDriverapplication = this.driverapplication.filter(driverapplication => driverapplication.status === 'EXPIRING');
    }
    // console.log(this.filteredDriverapplication)
    this.cdr.detectChanges();
  }

  submitForm() {
    console.log('Submitting form...');
    console.log('New Driverapplication Data:', this.newDriverapplication);

    this.serviceAuthService.createDriverapplication(this.newDriverapplication).subscribe((response: any) => {
      console.log('Driverapplication created successfully:', response);
      // Refresh the driver application
      this.loadDriverapplication();
      // Clear the form after submission
      this.newDriverapplication = {};
    }, error => {
      console.error('Error creating driverapplication:', error);
    });
  }
}
