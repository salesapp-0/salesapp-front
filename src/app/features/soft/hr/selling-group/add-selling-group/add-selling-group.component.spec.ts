import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSellingGroupComponent } from './add-selling-group.component';

describe('AddSellingGroupComponent', () => {
  let component: AddSellingGroupComponent;
  let fixture: ComponentFixture<AddSellingGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSellingGroupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddSellingGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
