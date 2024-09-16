import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceAuthService {

  loginUrl: string = 'https://compliance-backend-debcf19b5689.herokuapp.com/api/login';
  registerUrl: string = 'https://compliance-backend-debcf19b5689.herokuapp.com/api/register';
  getTrucksapiUrl: string = 'https://compliance-backend-debcf19b5689.herokuapp.com/api/truckList/truck';
  createTruckUrl: string = 'https://compliance-backend-debcf19b5689.herokuapp.com/api/truckList/truck/create'; // Add create API URL
  getTrailerapiUrl: string = 'https://compliance-backend-debcf19b5689.herokuapp.com/api/trailerList/trailer';
  trailercreateUrl: string = 'https://compliance-backend-debcf19b5689.herokuapp.com/api/trailerList/trailer/create'; // Add create API URL
  getdriverapiUrl: string = 'https://compliance-backend-debcf19b5689.herokuapp.com/api/driverList/driver';
  drivercreateUrl: string = 'https://compliance-backend-debcf19b5689.herokuapp.com/api/driverList/driver/create'; // Add create API URL
  driverapplicationapiUrl: string = 'https://compliance-backend-debcf19b5689.herokuapp.com/api/driverApplication/driverapplication';
  driverapplicationcreateUrl: string = 'https://compliance-backend-debcf19b5689.herokuapp.com/api/driverApplivation/driverapplication/create'; // Add create API URL
  fileapiUrl: string = 'https://compliance-backend-debcf19b5689.herokuapp.com/api/customerdata';
  filecreateUrl: string = 'https://compliance-backend-debcf19b5689.herokuapp.com/api/customerdata/create';
  getUsersapiUrl: string = 'https://compliance-backend-debcf19b5689.herokuapp.com/api/getuser';
  passwordUpdateUrl: string = 'https://compliance-backend-debcf19b5689.herokuapp.com/api/change-password';
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
          localStorage.setItem('userType', response.usertype)
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

  getUserType(): string | null {
    return localStorage.getItem('usertype');
  }

  // Register New User or Admin
  registerUser(userData: any) {
    const token = this.getToken();
    if (!token) {
      throw new Error('No token stored');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post(this.registerUrl, userData, { headers });
  }

  // Get Reigisterd Users
  getUsersFromAPI() {
    const token = this.getToken();
    if (!token) {
      throw new Error('No token stored');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get(`${this.getUsersapiUrl}`, { headers });
  }

  //Create Trucks
  createTruck(truckData: any) {
    const token = this.getToken();
    if (!token) {
      throw new Error('No token stored');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post(this.createTruckUrl, truckData, { headers });
  }

  //Get Trucks Api
  getTrucksFromAPI(status?: string) {
    const token = this.getToken();
    if (!token) {
      throw new Error('No token stored');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const url = status ? `${this.getTrucksapiUrl}/getAll?status=${status}` : `${this.getTrucksapiUrl}/getAll`;

    return this.http.get(url, { headers });
  }

  // Get Trucks By Id
  getTruckById(id: string) {
    const token = this.getToken();
    if (!token) {
      throw new Error('No token stored');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.getTrucksapiUrl}/get/${id}`;

    return this.http.get<any>(url, { headers });
  }

  // Update Trucks
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

  // Create Trailers
  createTrailer(trailerData: any) {
    const token = this.getToken();
    if (!token) {
      throw new Error('No token stored');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post(this.trailercreateUrl, trailerData, { headers });
  }

  //Get Trailers
  getTrailersFromAPI(status?: string) {
    const token = this.getToken();
    if (!token) {
      throw new Error('No token stored');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const url = status ? `${this.getTrailerapiUrl}/getAll?status=${status}` : `${this.getTrailerapiUrl}/getAll`;

    return this.http.get(url, { headers });
  }

  // Get Trailer By Id
  getTrailerById(id: string) {
    const token = this.getToken();
    if (!token) {
      throw new Error('No token stored');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.getTrailerapiUrl}/get/${id}`;
  
    return this.http.get<any>(url, { headers });
  }


  // Update Trailers
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

  // Create Drivers
  createDriver(driverData: any) {
    const token = this.getToken();
    if (!token) {
      throw new Error('No token stored');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post(this.drivercreateUrl, driverData, { headers });
  }

  //Get Dreivers
  getDriversFromAPI(status?: string) {
    const token = this.getToken();
    if (!token) {
      throw new Error('No token stored');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const url = status ? `${this.getdriverapiUrl}/getAll?status=${status}` : `${this.getdriverapiUrl}/getAll`;

    return this.http.get(url, { headers });
  }

  //Get Drivers By ID
  getDriverById(id: string) {
    const token = this.getToken();
    if (!token) {
      throw new Error('No token stored');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.getdriverapiUrl}/get/${id}`;

    return this.http.get<any>(url, { headers });
  }

  // Update Drivers
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

  // Create DriverApplications 
  createDriverapplication(driverapplicationData: any) {
    const token = this.getToken();
    if (!token) {
      throw new Error('No token stored');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post(this.driverapplicationcreateUrl, driverapplicationData, { headers });
  }

  // Get DriverApplications
  getDriverapplicationFromAPI(status?: string) {
    const token = this.getToken();
    if (!token) {
      throw new Error('No token stored');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const url = status ? `${this.driverapplicationapiUrl}/getAll?status=${status}` : `${this.driverapplicationapiUrl}/getAll`;

    return this.http.get(url, { headers });
  }

  // Create files 
  createFile(fileData: any) {
    const token = this.getToken();
    if (!token) {
      throw new Error('No token stored');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post(this.filecreateUrl, fileData, { headers });
  }

  // Get Files 
  getFilesFromAPI() {
    const token = this.getToken();
    if (!token) {
      throw new Error('No token stored');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get(`${this.fileapiUrl}/getAll`, { headers });
  }

  // Update Users Password
  createUsers(usersData: any) {
    const token = this.getToken();
    if (!token) {
      throw new Error('No token stored');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.put(this.passwordUpdateUrl, usersData, { headers });
  }

  // Update Persmissions 
  updateUserPermissions(userId: string, permissions: any): Observable<any> {
    const token = this.getToken();
    if (!token) {
      throw new Error('No token stored');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.put(`${this.updateURL}/update-permissions/${userId}`, { permissions }, { headers });
  }

  // Create Companies
  createCompany(companyData: any) {
    const token = this.getToken();
    if (!token) {
      throw new Error('No token stored');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post(this.dashboardcreateUrl, companyData, { headers });
  }

  //Get All Compines
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

