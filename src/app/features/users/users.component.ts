import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ServiceAuthService } from '../../service/service-auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  newUsers: any = {};
  selectedUserId: string = '';
  selectedUserName: string = '';
  userPermissions: any = {};
  permissionsCategories = ['truckList', 'trailerList', 'driverList', 'driverApplication','companyList'];
  permissionsActions = ['create', 'read', 'update', 'delete'];
  newUser: any = {
    name: '',
    email: '',
    usertype: '',
    password: '',
    permissions: {
      truckList: { create: true, read: true, update: false, delete: false },
      trailerList: { create: true, read: true, update: false, delete: false },
      driverList: { create: true, read: true, update: false, delete: false },
      driverApplication: { create: true, read: true, update: false, delete: false },
      companyList: { create: true, read: true, update: false, delete: false }
    }
  };

  constructor(
    private serviceAuthService: ServiceAuthService,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getUsersFromAPI();
  }

  submitForm(): void {
    this.serviceAuthService.createUsers(this.newUsers)
      .subscribe((response: any) => {
        console.log('Password Updated successfully:', response);
        this.toastr.success('Password updated successfully', 'Success');
        this.getUsersFromAPI();
        this.newUsers = {};
      }, error => {
        console.error('Error Password updated:', error);
        this.toastr.error('Error updating password', 'Error');
      });
  }

  registerNewUser(): void {
    this.serviceAuthService.registerUser(this.newUser)
      .subscribe((response: any) => {
        console.log('User registered successfully:', response);
        this.toastr.success('User registered successfully', 'Success');
        this.getUsersFromAPI();
        this.newUser = {};
      }, error => {
        console.error('Error registering new user:', error);
        this.toastr.error('Error registering new user', 'Error');
      });
  }

  getUsersFromAPI() {
    this.serviceAuthService.getUsersFromAPI()
      .subscribe((data: any) => {
        if (data && data.users && Array.isArray(data.users)) {
          this.users = data.users;
          this.cdr.detectChanges();
          this.toastr.success('Users fetched successfully', 'Success');
        } else {
          console.error('Invalid data format received from API:', data);
          this.toastr.error('Invalid data format from API', 'Error');
        }
      }, error => {
        console.error('Error fetching users:', error);
        this.toastr.error('Error fetching users', 'Error');
      });
  }

  openPermissions(userId: string): void {
    this.selectedUserId = userId;
    const selectedUser = this.users.find(user => user._id === userId);
    if (selectedUser) {
      this.selectedUserName = selectedUser.name;
      this.userPermissions = selectedUser.permissions || {};
    }
  }

  onPermissionChange(userId: string, category: string, action: string, event: Event) {
    const input = event.target as HTMLInputElement;
    const checked = input.checked;
    if (!this.userPermissions[category]) {
      this.userPermissions[category] = {};
    }
    this.userPermissions[category][action] = checked;
  }

  savePermissions() {
    console.log('Saving permissions...');
    if (this.selectedUserId) {
      this.serviceAuthService.updateUserPermissions(this.selectedUserId, this.userPermissions)
        .subscribe((response: any) => {
          console.log('Permissions updated successfully for user:', this.selectedUserId, response);
          this.toastr.success('Permissions updated successfully', 'Success');
          this.getUsersFromAPI();
        }, error => {
          console.error('Error updating permissions for user:', this.selectedUserId, error);
          this.toastr.error('Error updating permissions', 'Error');
        });
    }
  }
}