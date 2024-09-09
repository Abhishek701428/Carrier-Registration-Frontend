import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ServiceAuthService } from '../../service/service-auth.service';

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
  permissionsCategories = ['truckList', 'trailerList', 'driverList', 'driverApplication'];
  permissionsActions = ['create', 'read', 'update', 'delete'];

  constructor(private serviceAuthService: ServiceAuthService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getUsersFromAPI();
  }

  submitForm(): void {
    this.serviceAuthService.createUsers(this.newUsers)
      .subscribe((response: any) => {
        this.getUsersFromAPI();
        this.newUsers = {};
      }, error => {
        console.error('Error creating users:', error);
      });
  }

  getUsersFromAPI() {
    this.serviceAuthService.getUsersFromAPI()
      .subscribe((data: any) => {
        console.log('Received users data:', data);
        if (data && data.users && Array.isArray(data.users)) {
          this.users = data.users;
          console.log('usertype', this.users);
          this.users.forEach(user => console.log('User:', user));
          this.cdr.detectChanges();
        } else {
          console.error('Invalid data format received from API:', data);
        }
      }, error => {
        console.error('Error fetching users:', error);
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
          this.getUsersFromAPI();
        }, error => {
          console.error('Error updating permissions for user:', this.selectedUserId, error);
        });
    }
  }
}
