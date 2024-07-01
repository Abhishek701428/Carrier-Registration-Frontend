import { Component, OnInit } from '@angular/core';
import { ServiceAuthService } from '../../service/service-auth.service';


@Component({
  selector: 'app-driver-list',
  templateUrl: './driver-list.component.html',
  styleUrl: './driver-list.component.css'

})
export class DriverListComponent implements OnInit {
  drivers: any[] = [];
  newDriver: any = {};

  constructor(private serviceAuthService: ServiceAuthService) { }

  ngOnInit(): void {
    this.getDriversFromAPI();
  }

  getDriversFromAPI() {
    this.serviceAuthService.getDriversFromAPI()
      .subscribe((data: any) => {
        this.drivers = data;
      }, error => {
        console.error(error);
      });
  }

  submitForm() {
    console.log('Submitting form...');
    console.log('New Driver Data:', this.newDriver);
  
    this.serviceAuthService.createDriver(this.newDriver)
      .subscribe((response: any) => {
        console.log('Driver created successfully:', response);
        // Optionally, refresh the trailer list
        this.getDriversFromAPI();
        // Clear the form after submission
        this.newDriver = {};
      }, error => {
        console.error('Error creating trailer:', error);
      });
  }
}

