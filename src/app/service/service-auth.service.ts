import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServiceAuthService {
  apiUrl: string = 'https://carrier-registration-backend-wt46.onrender.com/api/truckList/truck';
  loginUrl: string = 'https://carrier-registration-backend-wt46.onrender.com/api/login';
  createUrl: string = 'https://carrier-registration-backend-wt46.onrender.com/api/truckList/truck/create'; // Add create API URL

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
}