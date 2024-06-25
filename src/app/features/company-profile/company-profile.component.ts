import { Component, AfterViewInit } from '@angular/core';

// Import CountUp from 'demi'
declare const CountUp: any;

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
   styleUrls: ['./company-profile.component.css']
})
export class CompanyProfileComponent implements AfterViewInit {

  constructor() { }

  ngAfterViewInit(): void {
    // Initialize CountUp instances for each counter element
    const counters = document.querySelectorAll('.timer');
    counters.forEach(counter => {
      const dataTo = counter.getAttribute('data-to');
      if (dataTo !== null) {
        const countUp = new CountUp(counter, parseInt(dataTo), {
          duration: 2, // duration in seconds
          separator: ','
        });
        if (!countUp.error) {
          countUp.start();
        } else {
          console.error(countUp.error);
        }
      } else {
        console.error('data-to attribute not found');
      }
    });
  }
}
