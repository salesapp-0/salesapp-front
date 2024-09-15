import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { HeaderComponent } from '../../../shared/ui/header/header.component';
import { SidebarComponent } from '../../../shared/ui/sidebar/sidebar.component';
import { InputTextModule } from 'primeng/inputtext';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputNumberModule } from 'primeng/inputnumber';
import { OrganizationsService } from '../../../shared/services/organizations.service';
import { filter, map, of, switchMap, takeUntil } from 'rxjs';
import { unsub } from '../../../shared/classes/unsub.class';
import { CalendarModule } from 'primeng/calendar';
import { BuyerOrganization } from '../../../core/interfaces/buyer-organizations.interface';
import { OrganizationHelperService } from '../../../shared/services/organization-helper.service';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { MultiSelectModule } from 'primeng/multiselect';
import { log } from 'console';
interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'app-add-organization',
  standalone: true,
  imports: [
    HeaderComponent,
    SidebarComponent,
    FormsModule,
    InputTextModule,
    ReactiveFormsModule,
    CommonModule,
    InputNumberModule,
    CalendarModule,
    FileUploadModule,
    ToastModule,
    MultiSelectModule,
  ],
  templateUrl: './add-organization.component.html',
  styleUrl: './add-organization.component.scss',
  providers: [OrganizationHelperService, MessageService],
})
export class AddOrganizationComponent extends unsub implements OnInit {
  organizationForm!: FormGroup;
  $isEditMode$ = signal(false);
  $organizationId$ = signal('');
  $fileId$ = signal('');
  cities!: City[];
  selectedCities!: City[];
  @Output() close = new EventEmitter();
  @Input({ alias: 'organizationId' }) set _(id: string | null) {
    if (id) {
      this.$isEditMode$.set(true);
      this.$organizationId$.set(id);
      this.getOrganizationById(id);
    } else {
      this.$isEditMode$.set(false);
      this.$organizationId$.set('');
    }
  }
  private fb = inject(FormBuilder);
  private organizationService = inject(OrganizationsService);
  private organizationHelperService = inject(OrganizationHelperService);
  private messageService = inject(MessageService);
  ngOnInit(): void {
    this.cities = [];
    this.organizationForm = this.fb.group({
      legalName: ['', [Validators.required, Validators.minLength(4)]],
      tradeName: ['', [Validators.required, Validators.minLength(4)]],
      identificationCode: ['', [Validators.required, Validators.minLength(4)]],
      legalAddress: ['', [Validators.required, Validators.minLength(4)]],
      actualAddress: ['', [Validators.required, Validators.minLength(4)]],
      serviceCost: [null, [Validators.required]],
      paymentDate: ['', [Validators.required, Validators.minLength(4)]],
      bank: ['', [Validators.required, Validators.minLength(4)]],
      bankAccountNumber: ['', [Validators.required, Validators.minLength(4)]],
      contactPerson: ['', [Validators.required, Validators.minLength(4)]],
      contactPhoneNumber: ['', [Validators.required, Validators.minLength(4)]],
      contactMail: [
        [],
        [Validators.required, Validators.minLength(4), Validators.email],
      ],
      contactMails: ['', [Validators.maxLength(3)]],
      file: [null],
    });
  }

  onSubmit(): void {
    if (this.organizationForm.valid) {
      const organizationData =
        this.organizationHelperService.getOrganizationFormData(
          this.organizationForm
        );
      const formattedServiceCost = parseFloat(
        organizationData.serviceCost
      ).toFixed(2);

      if (!this.$isEditMode$()) {
        this.organizationService
          .createBuyerOrganization(
            organizationData.legalName,
            organizationData.tradeName,
            organizationData.identificationCode,
            organizationData.legalAddress,
            organizationData.actualAddress,
            formattedServiceCost,
            organizationData.paymentDate,
            organizationData.bank,
            organizationData.bankAccountNumber,
            organizationData.contactPerson,
            String(organizationData.contactPhoneNumber),
            organizationData.contactMail,
            organizationData.contactMails
          )
          .pipe(
            switchMap((res) => {
              if (this.$fileId$()) {
                return this.organizationService
                  .createBuyerOrganziationCotract(res.id, this.$fileId$())
                  .pipe(map(() => res));
              }
              this.close.emit();
              return of(res);
            }),
            takeUntil(this.unsubscribe$)
          )
          .subscribe();
      } else {
        this.organizationService
          .updateBuyerOrganization(
            organizationData.legalName,
            organizationData.tradeName,
            organizationData.identificationCode,
            organizationData.legalAddress,
            organizationData.actualAddress,
            formattedServiceCost,
            organizationData.paymentDate,
            organizationData.bank,
            organizationData.bankAccountNumber,
            organizationData.contactPerson,
            String(organizationData.contactPhoneNumber),
            organizationData.contactMail,
            this.$organizationId$(),
            organizationData.contactMails
          )
          .pipe(
            switchMap((res) => {
              if (this.$fileId$()) {
                return this.organizationService
                  .createBuyerOrganziationCotract(res.id, this.$fileId$())
                  .pipe(map(() => res));
              }
              this.close.emit();
              return of(res);
            }),
            takeUntil(this.unsubscribe$)
          )
          .subscribe();
      }
    } else {
      this.organizationForm.markAllAsTouched();
    }
  }

  get f() {
    return this.organizationForm.controls;
  }

  getOrganizationById(id: string): void {
    this.organizationService
      .getOrganizationById(id)
      .pipe(
        map((data: BuyerOrganization) => {
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
            contactMail: data.contactMail,
            contactMails: data.contactMails,
          });
        }),
        takeUntil(this.unsubscribe$)
      )
      .subscribe();
  }
  onUpload(event: any) {
    this.$fileId$.set(event.originalEvent.body.fileId);
    this.messageService.add({
      severity: 'info',
      detail: 'File Uploaded with Basic Mode',
    });
  }

  onError(event: any) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'File upload failed!',
    });
  }
}
