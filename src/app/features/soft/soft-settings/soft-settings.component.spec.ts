import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoftSettingsComponent } from './soft-settings.component';

describe('SoftSettingsComponent', () => {
  let component: SoftSettingsComponent;
  let fixture: ComponentFixture<SoftSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SoftSettingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SoftSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
