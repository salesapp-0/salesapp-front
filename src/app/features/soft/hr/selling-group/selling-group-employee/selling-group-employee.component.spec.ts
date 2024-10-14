import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellingGroupEmployeeComponent } from './selling-group-employee.component';

describe('SellingGroupEmployeeComponent', () => {
  let component: SellingGroupEmployeeComponent;
  let fixture: ComponentFixture<SellingGroupEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellingGroupEmployeeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SellingGroupEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
