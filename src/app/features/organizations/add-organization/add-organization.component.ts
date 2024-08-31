import {Component, inject, OnInit} from '@angular/core';
import {HeaderComponent} from "../../../shared/ui/header/header.component";
import {SidebarComponent} from "../../../shared/ui/sidebar/sidebar.component";
import {InputTextModule} from "primeng/inputtext";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {InputNumberModule} from "primeng/inputnumber";
import {OrganizationsService} from "../../../shared/services/organizations.service";
import {map, takeUntil} from "rxjs";
import {NavigateService} from "../../../shared/services/navigate.service";
import {unsub} from "../../../shared/classes/unsub.class";

@Component({
  selector: 'app-add-organization',
  standalone: true,
  imports: [
    HeaderComponent,
    SidebarComponent,
    FormsModule, InputTextModule,
    ReactiveFormsModule,
    CommonModule,
    InputNumberModule
  ],
  templateUrl: './add-organization.component.html',
  styleUrl: './add-organization.component.scss'
})
export class AddOrganizationComponent extends unsub implements OnInit{
  organizationForm!: FormGroup;
  private fb = inject(FormBuilder)
  private organizationService = inject(OrganizationsService)
  private navigateService = inject(NavigateService)
  ngOnInit(): void {
    this.organizationForm = this.fb.group({
      legalName: ['', [Validators.required, Validators.minLength(4)]],
      tradeName: ['', [Validators.required, Validators.minLength(4)]],
      identificationCode: ['', [Validators.required, Validators.minLength(4)]],
      legalAddress: ['', [Validators.required, Validators.minLength(4)]],
      actualAddress: ['', [Validators.required, Validators.minLength(4)]],
      serviceCost: ['', [Validators.required]],
      paymentDate: ['', [Validators.required, Validators.minLength(4)]],
      bank: ['', [Validators.required, Validators.minLength(4)]],
      bankAccountNumber: ['', [Validators.required, Validators.minLength(4)]],
      contactPerson: ['', [Validators.required, Validators.minLength(4)]],
      contactPhoneNumber: ['', [Validators.required, Validators.minLength(4)]],
      contactMail: ['', [Validators.required, Validators.minLength(4), Validators.email]],
    });
  }

  onSubmit() {
    if (this.organizationForm.valid) {
      this.organizationService.createBuyerOrganization(
        this.organizationForm.get('legalName')?.value,
        this.organizationForm.get('tradeName')?.value,
        this.organizationForm.get('identificationCode')?.value,
        this.organizationForm.get('legalAddress')?.value,
        this.organizationForm.get('actualAddress')?.value,
        this.organizationForm.get('serviceCost')?.value,
        this.organizationForm.get('paymentDate')?.value,
        this.organizationForm.get('bank')?.value,
        this.organizationForm.get('bankAccountNumber')?.value,
        this.organizationForm.get('contactPerson')?.value,
        this.organizationForm.get('contactPhoneNumber')?.value,
        this.organizationForm.get('contactMail')?.value
      ).pipe(
        map(() => {
          this.onNavigate('/buyer-organizations')
        }),takeUntil(this.unsubscribe$)
      ).subscribe()
    } else {
      this.organizationForm.markAllAsTouched();
    }
  }
  onNavigate(route:string) {
    this.navigateService.navigateTo(route)
  }
  get f() {
    return this.organizationForm.controls;
  }
}
