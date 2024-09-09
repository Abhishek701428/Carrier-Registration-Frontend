import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceAuthService } from '../../service/service-auth.service';

@Component({
  selector: 'app-trailer-list-view',
  templateUrl: './trailer-list-view.component.html',
  styleUrl: './trailer-list-view.component.css'
})
export class TrailerListViewComponent implements OnInit {
  trailerId: string | null = null;
  trailerData: any;

  constructor(
    private route: ActivatedRoute,
    private serviceAuth: ServiceAuthService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.trailerId = params.get('id');
      console.log('Trailer ID:', this.trailerId); // Debug: Log truck ID
      if (this.trailerId) {
        this.loadTrailerData(this.trailerId);
      } else {
        console.error('No Trailer ID found in route parameters.');
      }
    });
  }

  loadTrailerData(id: string): void {
    if (!id) {
      console.error('ID is undefined or null');
      return;
    }
    console.log('Loading trailer data for ID:', id);
    this.serviceAuth.getTrailerById(id).subscribe(
      data => {
        console.log('Trailer Data:', data);
        this.trailerData = data;
      },
      error => {
        console.error('Error loading trailer data:', error);
      }
    );
  }
}
