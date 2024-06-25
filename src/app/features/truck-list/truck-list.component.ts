import { Component, OnInit } from '@angular/core';
import { ServiceAuthService } from '../../service/service-auth.service';

@Component({
  selector: 'app-truck-list',
  templateUrl: './truck-list.component.html',
  styleUrls: ['./truck-list.component.css']
})
export class TruckListComponent implements OnInit {
  trucks: any[] = [];
  newTruck: any = {};

  constructor(private serviceAuthService: ServiceAuthService) { }

  ngOnInit(): void {
    this.getTrucksFromAPI();
  }

  getTrucksFromAPI() {
    this.serviceAuthService.getTrucksFromAPI()
      .subscribe((data: any) => {
        this.trucks = data;
      }, error => {
        console.error(error);
      });
  }

  submitForm() {
    console.log('Submitting form...');
    console.log('New Truck Data:', this.newTruck);
  
    this.serviceAuthService.createTruck(this.newTruck)
      .subscribe((response: any) => {
        console.log('Truck created successfully:', response);
        // Optionally, refresh the truck list
        this.getTrucksFromAPI();
        // Clear the form after submission
        this.newTruck = {};
      }, error => {
        console.error('Error creating truck:', error);
      });
  }
}
