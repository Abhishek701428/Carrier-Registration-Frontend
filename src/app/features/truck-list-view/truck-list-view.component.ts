import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceAuthService } from '../../service/service-auth.service';

@Component({
  selector: 'app-truck-list-view',
  templateUrl: './truck-list-view.component.html',
  styleUrl: './truck-list-view.component.css'
})
export class TrucklistViewComponent implements OnInit {
  truckId: string | null = null;
  truckData: any;

  constructor(
    private route: ActivatedRoute,
    private serviceAuth: ServiceAuthService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.truckId = params.get('id');
      console.log('Truck ID:', this.truckId); // Debug: Log truck ID
      if (this.truckId) {
        this.loadTruckData(this.truckId);
      } else {
        console.error('No Truck ID found in route parameters.');
      }
    });
  }

  loadTruckData(id: string): void {
    if (!id) {
      console.error('ID is undefined or null');
      return;
    }
    console.log('Loading truck data for ID:', id);
    this.serviceAuth.getTruckById(id).subscribe(
      data => {
        console.log('Truck Data:', data);
        this.truckData = data;
      },
      error => {
        console.error('Error loading truck data:', error);
      }
    );
  }
}
