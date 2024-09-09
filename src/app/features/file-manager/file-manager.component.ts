import { Component, OnInit } from '@angular/core';
import { ServiceAuthService } from '../../service/service-auth.service';


@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrl: './file-manager.component.css'


})
export class FileManagerComponent implements OnInit {
  files: any[] = [];
  newFile: any = {};

  constructor(private serviceAuthService: ServiceAuthService) { }

  ngOnInit(): void {
    this.getFilesFromAPI();
  }

  getFilesFromAPI() {
    this.serviceAuthService.getFilesFromAPI()
      .subscribe((data: any) => {
        this.files = data;
      }, error => {
        console.error(error);
      });
  }
  getStars(rating: number): Array<number> {
    return new Array(rating);
  }

  submitForm() {
    console.log('Submitting form...');
    console.log('New File Data:', this.newFile);
  
    this.serviceAuthService.createFile(this.newFile)
      .subscribe((response: any) => {
        console.log('File created successfully:', response);
        // Optionally, refresh the file list
        this.getFilesFromAPI();
        // Clear the form after submission
        this.newFile = {};
      }, error => {
        console.error('Error creating file:', error);
      });
  }
}



