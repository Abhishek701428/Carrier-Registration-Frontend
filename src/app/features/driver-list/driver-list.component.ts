import { Component, OnInit } from '@angular/core';
import { ServiceAuthService } from '../../service/service-auth.service';
import { ChangeDetectorRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { Renderer2 } from '@angular/core';

@Component({
  selector: 'app-driver-list',
  templateUrl: './driver-list.component.html',
  styleUrls:[ './driver-list.component.css']

})
export class DriverListComponent implements OnInit {
  drivers: any[] = [];
  newDriver: any = {};
  filteredDrivers : any[] = [];
  selectedDriver: any = null;
  driverIdToDelete: string | null = null;
  driverToEdit: any = {};
  originaldriverData: any = {}; // Store original driver data for comparison

  constructor(
    private serviceAuthService: ServiceAuthService, 
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService,
    private renderer: Renderer2) { }
  ngOnInit(): void {
    this.loadDrivers();
  }

  loadDrivers() {
    this.serviceAuthService.getDriversFromAPI().subscribe((drivers: any) => {
      // console.log(drivers)
      this.drivers = drivers;
      this.filteredDrivers = drivers;
    }, error => {
      console.error(error);
      this.toastr.error('Failed to load drivers.', 'Error');
    });
  }

  filterDrivers(filterType: string) {
    // console.log(filterType)
    if (filterType === 'all') {
      this.filteredDrivers = this.drivers;
    } else if (filterType === 'nonCompliant') {
      this.filteredDrivers = this.drivers.filter(driver => driver.status === 'APPROVED');
    } else if (filterType === 'compliant') {
      this.filteredDrivers = this.drivers.filter(driver => driver.status === 'PENDING');
    } else if (filterType === 'expiring') {
      this.filteredDrivers = this.drivers.filter(driver => driver.status === 'EXPIRING');
    }
    // console.log(this.filtereddrivers)
    this.cdr.detectChanges();
  }
  onFileChange(event: any, key: string) {
    const file = event.target.files[0];
    if (file) {
      this.newDriver[key] = file;
    }else {
      this.newDriver[key] = null;
    }
  }
  submitForm(form: NgForm) {
    if (form.invalid) {
      this.toastr.error('Please correct the highlighted fields before submitting.', 'Form Submission Error');
      return;
    }


    
    const formData = new FormData();
    Object.keys(this.newDriver).forEach(key => {
      formData.append(key, this.newDriver[key]);
    });

    this.serviceAuthService.createDriver(formData).subscribe((response: any) => {
      console.log('Driver created successfully:', response);
      this.toastr.success('driver created successfully!', 'Success');
      this.loadDrivers();
      this.newDriver = {};
      form.resetForm();

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
      console.error('Error creating driver:', error);
      this.toastr.error('Failed to create driver.', 'Error');
    });
  }


  setDriverToDelete(id: string) {
    this.driverIdToDelete = id;
  }

  deleteDriver(id?: string) {
    if (id) {
      this.serviceAuthService.deleteDriver(id).subscribe((response: any) => {
        console.log('Driver deleted successfully:', response);
        this.toastr.success('driver deleted successfully!', 'Success');
        this.loadDrivers();
        this.driverIdToDelete = null;
      }, error => {
        console.error('Error deleting driver:', error);
        this.toastr.error('Failed to delete driver.', 'Error');
      });
    }
  }

  
  editdriver(driver: any) {
    this.driverToEdit = { ...driver }; 
    this.originaldriverData = { ...driver }; // Save the original driver data for comparison
  }

  driverEditFile(event: any, key: string) {
    const file = event.target.files[0];
    if (file) {
      this.driverToEdit[key] = file;
    }
  }

  hasChanges(): boolean {
    // Compare original driver data with the current driverToEdit data
    return JSON.stringify(this.driverToEdit) !== JSON.stringify(this.originaldriverData);
  }

  updateDriver() {
    if (!this.hasChanges()) {
      // No changes detected
      this.toastr.error('No changes detected. Please modify the driver details before saving.', 'Error');
      return;
    }

    const formData = new FormData();
    Object.keys(this.driverToEdit).forEach(key => {
      formData.append(key, this.driverToEdit[key]);
    });

    this.serviceAuthService.updateDriver(this.driverToEdit._id, formData).subscribe((response: any) => {
      console.log('driver updated successfully:', response);
      this.toastr.success('driver updated successfully!', 'Success');
      this.loadDrivers();
      this.driverToEdit = {}; 
    }, error => {
      console.error('Error updating driver:', error);
      this.toastr.error('Failed to update driver.', 'Error');
    });
  }
}