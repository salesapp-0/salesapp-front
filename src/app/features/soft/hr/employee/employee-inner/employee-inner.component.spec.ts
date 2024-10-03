import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeInnerComponent } from './employee-inner.component';

describe('EmployeeInnerComponent', () => {
  let component: EmployeeInnerComponent;
  let fixture: ComponentFixture<EmployeeInnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeInnerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeeInnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
