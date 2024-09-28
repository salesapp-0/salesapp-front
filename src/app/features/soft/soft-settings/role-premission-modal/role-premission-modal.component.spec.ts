import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolePremissionModalComponent } from './role-premission-modal.component';

describe('RolePremissionModalComponent', () => {
  let component: RolePremissionModalComponent;
  let fixture: ComponentFixture<RolePremissionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RolePremissionModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RolePremissionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
