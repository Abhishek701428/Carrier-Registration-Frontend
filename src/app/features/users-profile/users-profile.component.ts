import { ChangeDetectorRef, Component } from '@angular/core';
import { ServiceAuthService } from '../../service/service-auth.service';

@Component({
  selector: 'app-users-profile',
  templateUrl: './users-profile.component.html',
  styleUrl: './users-profile.component.css'
})
export class UsersProfileComponent {
  totalTrucks: number = 0;
  totalTrailers: number = 0;
  totalDrivers: number = 0;
  nonCompliantTrucks: number = 0;
  compliantTrucks: number = 0;
  expiringTrucks: number = 0;
  nonCompliantTrailers: number = 0;
  compliantTrailers: number = 0;
  expiringTrailers: number = 0;
  nonCompliantDrivers: number = 0;
  compliantDrivers: number = 0;
  expiringDrivers: number = 0;

  constructor(private authService: ServiceAuthService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.fetchCounts();
  }

  fetchCounts(): void {

    this.authService.getTrucksFromAPI().subscribe((trucks: any) => {
      console.log('Fetched trucks data:', trucks);
      this.totalTrucks = trucks.length;
      this.animateCount(this.totalTrucks, 'totalTrucks');

      this.updateCountsByStatus(trucks, 'APPROVED', 'nonCompliantTrucks');
      this.updateCountsByStatus(trucks, 'PENDING', 'compliantTrucks');
      this.updateCountsByStatus(trucks, 'EXPIRING', 'expiringTrucks');
    });

    this.authService.getTrailersFromAPI().subscribe((trailers: any) => {
      console.log('Fetched trailers data:', trailers);
      this.totalTrailers = trailers.length;
      this.animateCount(this.totalTrailers, 'totalTrailers');

      this.updateCountsByStatus(trailers, 'APPROVED', 'nonCompliantTrailers');
      this.updateCountsByStatus(trailers, 'PENDING', 'compliantTrailers');
      this.updateCountsByStatus(trailers, 'EXPIRING', 'expiringTrailers');
    });

    this.authService.getDriversFromAPI().subscribe((drivers: any) => {
      console.log('Fetched drivers data:', drivers);
      this.totalDrivers = drivers.length;
      this.animateCount(this.totalDrivers, 'totalDrivers');

      this.updateCountsByStatus(drivers, 'APPROVED', 'nonCompliantDrivers');
      this.updateCountsByStatus(drivers, 'PENDING', 'compliantDrivers');
      this.updateCountsByStatus(drivers, 'EXPIRING', 'expiringDrivers');
    });
  }

  updateCountsByStatus(data: any, status: string, property: string): void {
    const filteredData = data.filter((item: any) => item.status === status);
    console.log(`Filtered data for status ${status}:`, filteredData);
    const count = filteredData.length;
    console.log(`Count for ${status}: ${count}`);
    (this as any)[property] = count;
    this.cdr.detectChanges();
  }

  animateCount(finalCount: number, property: string): void {
    let currentCount = 0;
    const increment = Math.ceil(finalCount / 100);
    const interval = setInterval(() => {
      if (currentCount < finalCount) {
        currentCount += increment;
        if (currentCount > finalCount) {
          currentCount = finalCount;
        }
        (this as any)[property] = currentCount;
        console.log(`Animating ${property}: ${currentCount}`);
      } else {
        clearInterval(interval);
      }
      this.cdr.detectChanges();
    }, 10);
  }
}


