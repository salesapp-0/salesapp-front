import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebContainerInnerComponent } from './web-container-inner.component';

describe('WebContainerInnerComponent', () => {
  let component: WebContainerInnerComponent;
  let fixture: ComponentFixture<WebContainerInnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebContainerInnerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WebContainerInnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
