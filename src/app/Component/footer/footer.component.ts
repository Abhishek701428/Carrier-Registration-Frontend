import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  userId!: number;
  constructor() { }

  ngOnInit() {
    this.userId = JSON.parse(localStorage.getItem('session')!).userId
  }

}
