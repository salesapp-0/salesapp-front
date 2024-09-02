import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificOrganizationComponent } from './specific-organization.component';

describe('SpecificOrganizationComponent', () => {
  let component: SpecificOrganizationComponent;
  let fixture: ComponentFixture<SpecificOrganizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecificOrganizationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpecificOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
