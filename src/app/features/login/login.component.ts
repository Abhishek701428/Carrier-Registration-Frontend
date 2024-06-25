import { Component } from '@angular/core';
import { Router } from '@angular/router'; 
import { ServiceAuthService } from '../../service/service-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;

  constructor(private authService: ServiceAuthService, private router: Router) { } 

  login() {
    this.authService.login(this.email, this.password, this.rememberMe)
      .subscribe(response => {
        console.log(response);
        this.router.navigate(['/company-profile']); 
      }, error => {
        console.error(error);
      });
  }
}