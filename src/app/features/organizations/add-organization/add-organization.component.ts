import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  signal,
  ViewChild,
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
import { catchError, map, of, switchMap, takeUntil } from 'rxjs';
import { unsub } from '../../../shared/classes/unsub.class';
import { CalendarModule } from 'primeng/calendar';
import { BuyerOrganization } from '../../../core/interfaces/buyer-organizations.interface';
import { OrganizationHelperService } from '../../../shared/services/organization-helper.service';
import { FileUpload, FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { MultiSelectModule } from 'primeng/multiselect';
import { AddEmailComponent } from './add-email/add-email.component';

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
    AddEmailComponent,
  ],
  templateUrl: './add-organization.component.html',
  styleUrl: './add-organization.component.scss',
  providers: [OrganizationHelperService, MessageService],
})
export class AddOrganizationComponent extends unsub implements OnInit {
  @ViewChild('fileInput') fileInput!: FileUpload;
  organizationForm!: FormGroup;
  $isEditMode$ = signal(false);
  $organizationId$ = signal('');
  $addEmailsPopup$ = signal(false);
  $fileId$ = signal('');
  contactMails: { name: string }[] = [];
  selectedContactMails: { name: string }[] = [];
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
    this.initFormGroup();
  }

  private initFormGroup(): void {
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
        '',
        [Validators.required, Validators.minLength(4), Validators.email],
      ],
      contactMails: [''],
      file: [null],
    });
  }

  onSubmit(): void {
    if (this.organizationForm.valid) {
      this.triggerUpload();
      const organizationData =
        this.organizationHelperService.getOrganizationFormData(
          this.organizationForm
        );

      const formattedServiceCost = parseFloat(
        organizationData.serviceCost
      ).toFixed(2);
      const formatedCOntactMails = organizationData.contactMails.map(
        (obj: { name: string }) => obj.name
      );
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
            formatedCOntactMails
          )
          .pipe(
            switchMap((res) => {
              if (this.$fileId$()) {
                return this.organizationService
                  .createBuyerOrganziationCotract(res.id, this.$fileId$())
                  .pipe(
                    map(() => {
                      return res;
                    })
                  );
              }
              this.close.emit();
              return of(res);
            }),
            catchError((err) => {
              this.messageService.add({
                severity: 'error',
                detail: err,
              });
              return err;
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
            formatedCOntactMails
          )
          .pipe(
            switchMap((res) => {
              if (this.$fileId$()) {
                return this.organizationService
                  .createBuyerOrganziationCotract(res.id, this.$fileId$())
                  .pipe(
                    map(() => {
                      return res;
                    })
                  );
              }
              this.close.emit();
              return of(res);
            }),
            catchError((err) => {
              this.messageService.add({
                severity: 'error',
                detail: err,
              });
              return err;
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
            contactMails: data.contactMails.map((email) => ({ name: email })),
          });
          if (data.contactMail) {
            this.setContactMails(data);
          }
        }),
        catchError((err) => {
          this.messageService.add({
            severity: 'error',
            detail: err,
          });
          return err;
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
  onSetEmail(event: string) {
    this.selectedContactMails.push({
      name: event,
    });
    this.contactMails.push({
      name: event,
    });
  }

  triggerUpload() {
    if (this.fileInput) {
      this.fileInput.upload();
    }
  }
  setContactMails(data: { contactMails: string[] }) {
    this.selectedContactMails = [];
    this.contactMails = [];
    for (let email of data.contactMails) {
      this.contactMails.push({ name: email });
    }
  }
}
