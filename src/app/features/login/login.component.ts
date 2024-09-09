import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceAuthService } from '../../service/service-auth.service';
import { ToastrService } from 'ngx-toastr'; // Import ToastrService

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;

  constructor(
    private authService: ServiceAuthService,
    private router: Router,
    private toastr: ToastrService // Inject ToastrService
  ) { } 

  login() {
    this.authService.login(this.email, this.password, this.rememberMe)
      .subscribe(response => {
        console.log(response);
        this.toastr.success('Login successful!', 'Success'); // Show success toast
        this.router.navigate(['/company-profile']);
      }, error => {
        console.error(error);
        this.toastr.error('Login failed. Please try again.', 'Error'); // Show error toast
      });
      
    }
}