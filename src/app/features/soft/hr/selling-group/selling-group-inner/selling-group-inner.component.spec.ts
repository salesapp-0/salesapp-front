import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellingGroupInnerComponent } from './selling-group-inner.component';

describe('SellingGroupInnerComponent', () => {
  let component: SellingGroupInnerComponent;
  let fixture: ComponentFixture<SellingGroupInnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellingGroupInnerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SellingGroupInnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
