import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ServiceAuthService } from '../../service/service-auth.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { Renderer2 } from '@angular/core';

@Component({
  selector: 'app-truck-list',  
  templateUrl: './truck-list.component.html',
  styleUrls: ['./truck-list.component.css']
})
export class TruckListComponent implements OnInit {
  trucks: any[] = [];
  filteredTrucks: any[] = [];
  newTruck: any = {};
  truckIdToDelete: string | null = null;
  truckToEdit: any = {};
  originalTruckData: any = {}; // Store original truck data for comparison

  constructor(
    private serviceAuthService: ServiceAuthService,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.loadTrucks();
  }

  loadTrucks() {
    this.serviceAuthService.getTrucksFromAPI().subscribe((trucks: any) => {
      this.trucks = trucks;
      this.filteredTrucks = trucks;
    }, error => {
      console.error(error);
      this.toastr.error('Failed to load trucks.', 'Error');
    });
  }

  filterTrucks(filterType: string) {
    if (filterType === 'all') {
      this.filteredTrucks = this.trucks;
    } else if (filterType === 'nonCompliant') {
      this.filteredTrucks = this.trucks.filter(truck => truck.status === 'APPROVED');
    } else if (filterType === 'compliant') {
      this.filteredTrucks = this.trucks.filter(truck => truck.status === 'PENDING');
    } else if (filterType === 'expiring') {
      this.filteredTrucks = this.trucks.filter(truck => truck.status === 'EXPIRING');
    }
    this.cdr.detectChanges();
  }

  onFileChange(event: any, key: string) {
    const file = event.target.files[0];
    if (file) {
      this.newTruck[key] = file;
    } else {
      this.newTruck[key] = null;
    }
  }

  submitForm(form: NgForm) {
    if (form.invalid) {
      // Mark all controls as touched to trigger validation and highlight errors
      Object.keys(form.controls).forEach(field => {
        const control = form.control.get(field);
        if (control) {
          control.markAsTouched({ onlySelf: true });
        }
      });

      this.toastr.error('Please correct the highlighted fields before submitting.', 'Form Submission Error');
      return;
    }

    const formData = new FormData();
    Object.keys(this.newTruck).forEach(key => {
      formData.append(key, this.newTruck[key]);
    });

    this.serviceAuthService.createTruck(formData).subscribe((response: any) => {
      console.log('Truck created successfully:', response);
      this.toastr.success('Truck created successfully!', 'Success');
      this.loadTrucks();
      this.newTruck = {};
      form.resetForm();

      // Close the off-canvas only if the form submission was successful
      this.closeOffCanvas();
    }, error => {
      console.error('Error creating truck:', error);
      this.toastr.error('Failed to create truck.', 'Error');
    });
  }

  private closeOffCanvas() {
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
  }

  setTruckToDelete(id: string) {
    this.truckIdToDelete = id;
  }

  deleteTruck(id?: string) {
    if (id) {
      this.serviceAuthService.deleteTruck(id).subscribe((response: any) => {
        console.log('Truck deleted successfully:', response);
        this.toastr.success('Truck deleted successfully!', 'Success');
        this.loadTrucks();
        this.truckIdToDelete = null;
      }, error => {
        console.error('Error deleting truck:', error);
        this.toastr.error('Failed to delete truck.', 'Error');
      });
    }
  }

  editTruck(truck: any) {
    this.truckToEdit = { ...truck };
    this.originalTruckData = { ...truck }; // Save the original truck data for comparison
  }

  truckEditFile(event: any, key: string) {
    const file = event.target.files[0];
    if (file) {
      this.truckToEdit[key] = file;
    }
  }

  hasChanges(): boolean {
    // Compare original truck data with the current truckToEdit data
    return JSON.stringify(this.truckToEdit) !== JSON.stringify(this.originalTruckData);
  }

  updateTruck() {
    if (!this.hasChanges()) {
      // No changes detected
      this.toastr.error('No changes detected. Please modify the truck details before saving.', 'Error');
      return;
    }

    const formData = new FormData();
    Object.keys(this.truckToEdit).forEach(key => {
      formData.append(key, this.truckToEdit[key]);
    });

    this.serviceAuthService.updateTruck(this.truckToEdit._id, formData).subscribe((response: any) => {
      console.log('Truck updated successfully:', response);
      this.toastr.success('Truck updated successfully!', 'Success');
      this.loadTrucks();
      this.truckToEdit = {};
      this.originalTruckData = {}; // Clear original data
    }, error => {
      console.error('Error updating truck:', error);
      this.toastr.error('Failed to update truck.', 'Error');
    });
  }
}
