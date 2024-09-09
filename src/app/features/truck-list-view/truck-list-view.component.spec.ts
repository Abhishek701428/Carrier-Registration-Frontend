import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TruckListViewComponent } from './truck-list-view.component';

describe('TruckListViewComponent', () => {
  let component: TruckListViewComponent;
  let fixture: ComponentFixture<TruckListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TruckListViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TruckListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
