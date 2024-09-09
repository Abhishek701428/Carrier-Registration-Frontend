import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceAuthService {

  loginUrl: string = 'https://compliance-backend-debcf19b5689.herokuapp.com/api/login';
  apiUrl: string = 'https://compliance-backend-debcf19b5689.herokuapp.com/api/truckList/truck';
  createUrl: string = 'https://compliance-backend-debcf19b5689.herokuapp.com/api/truckList/truck/create'; // Add create API URL
  trailerapiUrl: string = 'https://compliance-backend-debcf19b5689.herokuapp.com/api/trailerList/trailer';
  trailercreateUrl: string = 'https://compliance-backend-debcf19b5689.herokuapp.com/api/trailerList/trailer/create'; // Add create API URL
  driverapiUrl: string = 'https://compliance-backend-debcf19b5689.herokuapp.com/api/driverList/driver';
  drivercreateUrl: string = 'https://compliance-backend-debcf19b5689.herokuapp.com/api/driverList/driver/create'; // Add create API URL
  driverapplicationapiUrl: string = 'https://compliance-backend-debcf19b5689.herokuapp.com/api/driverApplication/driverapplication';
  driverapplicationcreateUrl: string = 'https://compliance-backend-debcf19b5689.herokuapp.com/api/driverApplivation/driverapplication/create'; // Add create API URL
  fileapiUrl: string = 'https://compliance-backend-debcf19b5689.herokuapp.com/api/customerdata';
  filecreateUrl: string = 'https://compliance-backend-debcf19b5689.herokuapp.com/api/customerdata/create';
  usersapiUrl: string = 'https://compliance-backend-debcf19b5689.herokuapp.com/api/getuser';
  userscreateUrl: string = 'https://compliance-backend-debcf19b5689.herokuapp.com/api/change-password';
  updateURL = 'https://compliance-backend-debcf19b5689.herokuapp.com'

  updateTruckUrl: string = 'https://compliance-backend-debcf19b5689.herokuapp.com/api/truckList/truck/update'; // Update API URL
  deleteTruckUrl: string = 'https://compliance-backend-debcf19b5689.herokuapp.com/api/truckList/truck/delete'; // Delete API URL
  updateTrailerUrl: string = 'https://compliance-backend-debcf19b5689.herokuapp.com/api/trailerList/trailer/update'; // Update API URL
  deleteTrailerUrl: string = 'https://compliance-backend-debcf19b5689.herokuapp.com/api/trailerList/trailer/delete'; // Delete API URL
  updateDriverUrl: string = 'https://compliance-backend-debcf19b5689.herokuapp.com/api/driverList/driver/update'; // Update API URL
  deleteDriverUrl: string = 'https://compliance-backend-debcf19b5689.herokuapp.com/api/driverList/driver/delete'; // Delete API URL



  dashboardcreateUrl: string = 'https://compliance-backend-debcf19b5689.herokuapp.com/api/company/create';
  dashboardapiUrl: string = 'https://compliance-backend-debcf19b5689.herokuapp.com/api/company/getAll';




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

  getTrucksFromAPI(status?: string) {
    const token = this.getToken();
    if (!token) {
      throw new Error('No token stored');
    }

    // Include token in headers
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Include status in query params if provided
    const url = status ? `${this.apiUrl}/getAll?status=${status}` : `${this.apiUrl}/getAll`;

    return this.http.get(url, { headers });
  }
  createTruck(truckData: any) {
    const token = this.getToken();
    if (!token) {
      throw new Error('No token stored');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post(this.createUrl, truckData, { headers });
  }

  getTruckById(id: string) {
    const token = this.getToken();
    if (!token) {
      throw new Error('No token stored');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.apiUrl}/get/${id}`;
    console.log('Fetching truck by ID with URL:', url); // Log the URL being called
    return this.http.get<any>(url, { headers });
  }

  getTrailersFromAPI(status?: string) {
    const token = this.getToken();
    if (!token) {
      throw new Error('No token stored');
    }

    // Include token in headers
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Include status in query params if provided
    const url = status ? `${this.trailerapiUrl}/getAll?status=${status}` : `${this.trailerapiUrl}/getAll`;

    return this.http.get(url, { headers });
  }

  createTrailer(trailerData: any) {
    const token = this.getToken();
    if (!token) {
      throw new Error('No token stored');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post(this.trailercreateUrl, trailerData, { headers });
  }
  getTrailerById(id: string) {
    const token = this.getToken();
    if (!token) {
      throw new Error('No token stored');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.trailerapiUrl}/get/${id}`;
    console.log('Fetching trailer by ID with URL:', url); // Log the URL being called
    return this.http.get<any>(url, { headers });
  }



  getDriversFromAPI(status?: string) {
    const token = this.getToken();
    if (!token) {
      throw new Error('No token stored');
    }

    // Include token in headers
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Include status in query params if provided
    const url = status ? `${this.driverapiUrl}/getAll?status=${status}` : `${this.driverapiUrl}/getAll`;

    return this.http.get(url, { headers });
  }

  createDriver(driverData: any) {
    const token = this.getToken();
    if (!token) {
      throw new Error('No token stored');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post(this.drivercreateUrl, driverData, { headers });
  }

  getDriverById(id: string) {
    const token = this.getToken();
    if (!token) {
      throw new Error('No token stored');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.driverapiUrl}/get/${id}`;
    console.log('Fetching driver by ID with URL:', url); // Log the URL being called
    return this.http.get<any>(url, { headers });
  }




  getDriverapplicationFromAPI(status?: string) {
    const token = this.getToken();
    if (!token) {
      throw new Error('No token stored');
    }

    // Include token in headers
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Include status in query params if provided
    const url = status ? `${this.driverapplicationapiUrl}/getAll?status=${status}` : `${this.driverapplicationapiUrl}/getAll`;

    return this.http.get(url, { headers });
  }

  createDriverapplication(driverapplicationData: any) {
    const token = this.getToken();
    if (!token) {
      throw new Error('No token stored');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post(this.driverapplicationcreateUrl, driverapplicationData, { headers });
  }



  getFilesFromAPI() {
    const token = this.getToken();
    if (!token) {
      throw new Error('No token stored');
    }

    // Include token in headers
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get(`${this.fileapiUrl}/getAll`, { headers });
  }

  createFile(fileData: any) {
    const token = this.getToken();
    if (!token) {
      throw new Error('No token stored');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post(this.filecreateUrl, fileData, { headers });
  }




  getUsersFromAPI() {
    const token = this.getToken();
    if (!token) {
      throw new Error('No token stored');
    }

    // Include token in headers
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get(`${this.usersapiUrl}`, { headers });
  }

  createUsers(usersData: any) {
    const token = this.getToken();
    if (!token) {
      throw new Error('No token stored');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.put(this.userscreateUrl, usersData, { headers });
  }

  updateUserPermissions(userId: string, permissions: any): Observable<any> {
    const token = this.getToken();
    if (!token) {
      throw new Error('No token stored');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.put(`${this.updateURL}/update-permissions/${userId}`, { permissions }, { headers });
  }

  updateTruck(id: string, truckData: any) {
    const token = this.getToken();
    if (!token) {
      throw new Error('No token stored');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.put(`${this.updateTruckUrl}/${id}`, truckData, { headers });
  }

  // Delete Truck 
  deleteTruck(id: string) {
    const token = this.getToken();
    if (!token) {
      throw new Error('No token stored');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.delete(`${this.deleteTruckUrl}/${id}`, { headers });
  }

  updateTrailer(id: string, trailerData: any) {
    const token = this.getToken();
    if (!token) {
      throw new Error('No token stored');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.put(`${this.updateTrailerUrl}/${id}`, trailerData, { headers });
  }

  // Delete Trailer 
  deleteTrailer(id: string) {
    const token = this.getToken();
    if (!token) {
      throw new Error('No token stored');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.delete(`${this.deleteTrailerUrl}/${id}`, { headers });
  }

  updateDriver(id: string, driverData: any) {
    const token = this.getToken();
    if (!token) {
      throw new Error('No token stored');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.put(`${this.updateDriverUrl}/${id}`, driverData, { headers });
  }

  // Delete Trailer 
  deleteDriver(id: string) {
    const token = this.getToken();
    if (!token) {
      throw new Error('No token stored');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.delete(`${this.deleteDriverUrl}/${id}`, { headers });
  }


  createCompany(companyData: any) {
    const token = this.getToken();
    if (!token) {
      throw new Error('No token stored');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post(this.dashboardcreateUrl, companyData,{ headers });
  }


  getAllCompanies() {
    const token = this.getToken();
    if (!token) {
      throw new Error('No token stored');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);


    return this.http.get(this.dashboardapiUrl, { headers });
  }


  // getCompanyById(id: string) {
  //   const token = this.getToken();
  //   if (!token) {
  //     throw new Error('No token stored');
  //   }
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  //   const url = `${this.companiesapiUrl}/get/${id}`;
  //   console.log('Fetching company by ID with URL:', url); // Log the URL being called
  //   return this.http.get<any>(url, { headers });
  // }


}

