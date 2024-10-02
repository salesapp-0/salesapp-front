import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellingGroupComponent } from './selling-group.component';

describe('SellingGroupComponent', () => {
  let component: SellingGroupComponent;
  let fixture: ComponentFixture<SellingGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellingGroupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SellingGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
