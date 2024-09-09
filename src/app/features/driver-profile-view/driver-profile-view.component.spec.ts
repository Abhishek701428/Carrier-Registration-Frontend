import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverProfileViewComponent } from './driver-profile-view.component';

describe('DriverProfileViewComponent', () => {
  let component: DriverProfileViewComponent;
  let fixture: ComponentFixture<DriverProfileViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DriverProfileViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DriverProfileViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
