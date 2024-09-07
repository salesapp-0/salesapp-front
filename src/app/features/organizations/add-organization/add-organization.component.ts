import {Component, EventEmitter, inject, Input, OnInit, Output, signal, WritableSignal} from '@angular/core';
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
import {CalendarModule} from "primeng/calendar";
import {Writable} from "node:stream";
import {ActivatedRoute} from "@angular/router";
import {BuyerOrganization, BuyerOrganizations} from "../../../core/interfaces/buyer-organizations.interface";
import {OrganizationHelperService} from "../../../shared/services/organization-helper.service";

@Component({
  selector: 'app-add-organization',
  standalone: true,
  imports: [
    HeaderComponent,
    SidebarComponent,
    FormsModule, InputTextModule,
    ReactiveFormsModule,
    CommonModule,
    InputNumberModule,
    CalendarModule
  ],
  templateUrl: './add-organization.component.html',
  styleUrl: './add-organization.component.scss',
  providers: [OrganizationHelperService]
})
export class AddOrganizationComponent extends unsub implements OnInit{
  organizationForm!: FormGroup;
  $isEditMode$ = signal(false);
  $organizationId$ = signal('')
  @Output() close = new EventEmitter();
  @Input({alias:'organizationId'}) set _(id:string | null) {
      if (id) {
        this.$isEditMode$.set(true)
        this.$organizationId$.set(id)
        this.getOrganizationById(id);
      } else {
        this.$isEditMode$.set(false)
        this.$organizationId$.set('')
      }
  }
  private fb = inject(FormBuilder)
  private organizationService = inject(OrganizationsService)
  private navigateService = inject(NavigateService)
  private activatedRoute = inject(ActivatedRoute)
  private organizationHelperService = inject(OrganizationHelperService)
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

  onSubmit(): void {
    if (this.organizationForm.valid) {
      const organizationData = this.organizationHelperService.getOrganizationFormData(this.organizationForm);
      if (!this.$isEditMode$()) {
        this.organizationHelperService.createOrganization(organizationData, this.unsubscribe$,this.close.emit());
      } else {
        this.organizationHelperService.updateOrganization(organizationData, this.$organizationId$(), this.unsubscribe$,this.close.emit());
      }
    } else {
      this.organizationForm.markAllAsTouched();
    }
  }

  get f() {
    return this.organizationForm.controls;
  }

  getOrganizationById(id: string): void {
    this.organizationService.getOrganizationById(id).pipe(
      map((data:BuyerOrganization) => {
        const formattedDate = new Date(data.paymentDate);
        this.organizationForm.patchValue({
          legalName: data.legalName,
          tradeName: data.tradeName,
          identificationCode: data.identificationCode,
          legalAddress: data.legalAddress,
          actualAddress: data.actualAddress,
          serviceCost: data.serviceCost,
          paymentDate: formattedDate,
          bank: data.bank,
          bankAccountNumber: data.bankAccountNumber,
          contactPerson: data.contactPerson,
          contactPhoneNumber: data.contactPhoneNumber,
          contactMail: data.contactMail
        });
      }),takeUntil(this.unsubscribe$)
    ).subscribe()
  }
}
