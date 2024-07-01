import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServiceAuthService {
  loginUrl: string = 'https://carrier-registration-backend-1.onrender.com/api/login';
  apiUrl: string = 'https://carrier-registration-backend-1.onrender.com/api/truckList/truck';
  createUrl: string = 'https://carrier-registration-backend-1.onrender.com/api/truckList/truck/create'; // Add create API URL
  trailerapiUrl: string = 'https://carrier-registration-backend-1.onrender.com/api/trailerList/trailer';
  trailercreateUrl: string = 'https://carrier-registration-backend-1.onrender.com/api/trailerList/trailer/create'; // Add create API URL
  driverapiUrl: string = 'https://carrier-registration-backend-1.onrender.com/api/driverList/driver';
  drivercreateUrl: string = 'https://carrier-registration-backend-1.onrender.com/api/driverList/driver/create'; // Add create API URL


  constructor(private http: HttpClient) { }

  login(email: string, password: string, rememberMe: boolean) {
    const body = { email, password, rememberMe };
    return this.http.post<any>(this.loginUrl, body).pipe(
      tap(response => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('userId', response.userId); // Assuming your API response includes userId
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserId(): string | null {
    return localStorage.getItem('userId');
  }

  getTrucksFromAPI() {
    const token = this.getToken();
    if (!token) {
      throw new Error('No token stored');
    }

    // Include token in headers
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get(`${this.apiUrl}/getAll`, { headers });
  }

  createTruck(truckData: any) {
    const token = this.getToken();
    if (!token) {
      throw new Error('No token stored');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post(this.createUrl, truckData,{ headers });
  }


  getTrailersFromAPI() {
    const token = this.getToken();
    if (!token) {
      throw new Error('No token stored');
    }

    // Include token in headers
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get(`${this.trailerapiUrl}/getAll`, { headers });
  }

  createTrailer(trailerData: any) {
    const token = this.getToken();
    if (!token) {
      throw new Error('No token stored');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post(this.trailercreateUrl, trailerData,{ headers });
  }



  
  getDriversFromAPI() {
    const token = this.getToken();
    if (!token) {
      throw new Error('No token stored');
    }

    // Include token in headers
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get(`${this.driverapiUrl}/getAll`, { headers });
  }

  createDriver(driverData: any) {
    const token = this.getToken();
    if (!token) {
      throw new Error('No token stored');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post(this.drivercreateUrl, driverData,{ headers });
  }
}



