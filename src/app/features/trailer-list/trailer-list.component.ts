import { Component, OnInit } from '@angular/core';
import { ServiceAuthService } from '../../service/service-auth.service';


@Component({
  selector: 'app-trailer-list',
  templateUrl: './trailer-list.component.html',
  styleUrl: './trailer-list.component.css'
})
export class TrailerListComponent implements OnInit {
  trailers: any[] = [];
  newTrailer: any = {};

  constructor(private serviceAuthService: ServiceAuthService) { }

  ngOnInit(): void {
    this.getTrailersFromAPI();
  }

  getTrailersFromAPI() {
    this.serviceAuthService.getTrailersFromAPI()
      .subscribe((data: any) => {
        this.trailers = data;
      }, error => {
        console.error(error);
      });
  }

  submitForm() {
    console.log('Submitting form...');
    console.log('New Trailer Data:', this.newTrailer);
  
    this.serviceAuthService.createTrailer(this.newTrailer)
      .subscribe((response: any) => {
        console.log('Trailer created successfully:', response);
        // Optionally, refresh the trailer list
        this.getTrailersFromAPI();
        // Clear the form after submission
        this.newTrailer = {};
      }, error => {
        console.error('Error creating trailer:', error);
      });
  }
}

