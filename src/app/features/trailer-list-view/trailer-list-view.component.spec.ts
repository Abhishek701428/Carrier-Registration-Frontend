import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrailerListViewComponent } from './trailer-list-view.component';

describe('TrailerListViewComponent', () => {
  let component: TrailerListViewComponent;
  let fixture: ComponentFixture<TrailerListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrailerListViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrailerListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
