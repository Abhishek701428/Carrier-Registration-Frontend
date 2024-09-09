import { Component, OnInit } from '@angular/core';
import { ServiceAuthService } from '../../service/service-auth.service';
import { ChangeDetectorRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { Renderer2 } from '@angular/core';


@Component({
  selector: 'app-trailer-list',
  templateUrl: './trailer-list.component.html',
  styleUrl: './trailer-list.component.css'
})
export class TrailerListComponent implements OnInit {
  trailers: any[] = [];
  newTrailer: any = {};
  filteredTrailers: any[] = [];
  selectedTrailer: any = null;
  trailerIdToDelete: string | null = null;
  trailerToEdit: any = {};
  originalTrailerData: any = {}; // Store original trailer data for comparison

  constructor(
    private serviceAuthService: ServiceAuthService, 
    private cdr: ChangeDetectorRef,
    private renderer: Renderer2,
    private toastr: ToastrService) { }
  ngOnInit(): void {
    this.loadTrailers();
  }

  loadTrailers() {
    this.serviceAuthService.getTrailersFromAPI().subscribe((trailers: any) => {
      // console.log(trailers)
      this.trailers = trailers;
      this.filteredTrailers = trailers;
    }, error => {
      console.error(error);
      this.toastr.error('Failed to load trailers.', 'Error');
    });
  }

  filterTrailers(filterType: string) {
    // console.log(filterType)
    if (filterType === 'all') {
      this.filteredTrailers = this.trailers;
    } else if (filterType === 'nonCompliant') {
      this.filteredTrailers = this.trailers.filter(trailer => trailer.status === 'APPROVED');
    } else if (filterType === 'compliant') {
      this.filteredTrailers = this.trailers.filter(trailer => trailer.status === 'PENDING');
    } else if (filterType === 'expiring') {
      this.filteredTrailers = this.trailers.filter(trailer => trailer.status === 'EXPIRING');
    }
    // console.log(this.filteredtrailers)
    this.cdr.detectChanges();
  }
  onFileChange(event: any, key: string) {
    const file = event.target.files[0];
    if (file) {
      this.newTrailer[key] = file;
    } else {
      this.newTrailer[key] = null;
    }
  }
  submitForm(form: NgForm) {
    if (form.invalid) {
      // Mark all controls as touched to trigger validation and highlight errors
      Object.keys(form.controls).forEach(field => {
        const control = form.control.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
  
      this.toastr.error('Please correct the highlighted fields before submitting.', 'Form Submission Error');
      return;
    }
  
    const formData = new FormData();
    Object.keys(this.newTrailer).forEach(key => {
      formData.append(key, this.newTrailer[key]);
    });
  
    this.serviceAuthService.createTrailer(formData).subscribe((response: any) => {
      console.log('Trailer created successfully:', response);
      this.toastr.success('Trailer created successfully!', 'Success');
      this.loadTrailers();
      this.newTrailer = {};
      form.resetForm();
  
      // Close the off-canvas using Renderer2
      const offcanvasElement = document.getElementById('addLocation');
      if (offcanvasElement) {
        this.renderer.removeClass(offcanvasElement, 'show');
        this.renderer.setStyle(offcanvasElement, 'visibility', 'hidden');
        offcanvasElement.setAttribute('aria-hidden', 'true');
        offcanvasElement.removeAttribute('aria-modal');
  
        const backdrop = document.querySelector('.offcanvas-backdrop');
        if (backdrop) {
          this.renderer.removeChild(document.body, backdrop);
        }
      }
    }, error => {
      console.error('Error creating Trailer:', error);
      this.toastr.error('Failed to create Trailer.', 'Error');
    });
  }
  
  

  setTrailerToDelete(id: string) {
    this.trailerIdToDelete = id;
  }

  deleteTrailer(id?: string) {
    if (id) {
      this.serviceAuthService.deleteTrailer(id).subscribe((response: any) => {
        console.log('Trailer deleted successfully:', response);
        this.toastr.success('trailer deleted successfully!', 'Success');
        this.loadTrailers();
        this.trailerIdToDelete = null;
      }, error => {
        console.error('Error deleting trailer:', error);
        this.toastr.error('Failed to delete trailer.', 'Error');
      });
    }
}

editTrailer(trailer: any) {
  this.trailerToEdit = { ...trailer }; 
  this.originalTrailerData = { ...trailer }; // Save the original trailer data for comparison
}

trailerEditFile(event: any, key: string) {
  const file = event.target.files[0];
  if (file) {
    this.trailerToEdit[key] = file;
  }
}
hasChanges(): boolean {
  // Compare original trailer data with the current trailerToEdit data
  return JSON.stringify(this.trailerToEdit) !== JSON.stringify(this.originalTrailerData);
}


updateTrailer() {

  if (!this.hasChanges()) {
    // No changes detected
    this.toastr.error('No changes detected. Please modify the trailer details before saving.', 'Error');
    return;
  }
  const formData = new FormData();
  Object.keys(this.trailerToEdit).forEach(key => {
    formData.append(key, this.trailerToEdit[key]);
  });

  this.serviceAuthService.updateTrailer(this.trailerToEdit._id, formData).subscribe((response: any) => {
    console.log('trailer updated successfully:', response);
    this.toastr.success('trailer updated successfully!', 'Success');
    this.loadTrailers();
    this.originalTrailerData = {}; 
  }, error => {
    console.error('Error updating trailer:', error);
    this.toastr.error('Failed to update trailer.', 'Error');
    });
  }
}