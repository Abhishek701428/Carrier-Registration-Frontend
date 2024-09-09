import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceAuthService } from '../../service/service-auth.service';

@Component({
  selector: 'app-driver-profile-view',
  templateUrl: './driver-profile-view.component.html',
  styleUrl: './driver-profile-view.component.css'
})
export class DriverProfileViewComponent {
  driverId: string | null = null;
  driverData: any;

  constructor(
    private route: ActivatedRoute,
    private serviceAuth: ServiceAuthService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.driverId = params.get('id');
      console.log('driver ID:', this.driverId); // Debug: Log truck ID
      if (this.driverId) {
        this.loaddriverData(this.driverId);
      } else {
        console.error('No driver ID found in route parameters.');
      }
    });
  }

  loaddriverData(id: string): void {
    if (!id) {
      console.error('ID is undefined or null');
      return;
    }
    console.log('Loading driver data for ID:', id);
    this.serviceAuth.getDriverById(id).subscribe(
      data => {
        console.log('driver Data:', data);
        this.driverData = data;
      },
      error => {
        console.error('Error loading driver data:', error);
      }
    );
  }

}
