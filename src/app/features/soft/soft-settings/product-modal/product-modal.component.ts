import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CrudEnum } from '../../../../core/enums/crud.enum';
import { SoftParameterService } from '../../../../shared/services/soft/soft-parameter.service';
import { map, switchMap, takeUntil } from 'rxjs';
import { unsub } from '../../../../shared/classes/unsub.class';
import { AuthService } from '../../../../shared/services/auth.service';
@Component({
  selector: 'app-product-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    InputNumberModule,
    DropdownModule,
    InputTextareaModule,
    FloatLabelModule,
  ],
  templateUrl: './product-modal.component.html',
  styleUrl: './product-modal.component.scss',
})
export class ProductModalComponent extends unsub implements OnInit {
  productForm!: FormGroup;
  group: any | undefined;
  @Input() set actionType(val: { type: string; actionId: string }) {
    this.$actionTypeStr$.set(val);
    if (val.type === CrudEnum.ADD) {
    } else {
      this.softParameterService
        .getSpecificProductOption$(val.actionId)
        .pipe(
          map((res) => {
            this.productForm.get('name')?.patchValue(res.name);
            this.productForm.get('cost')?.patchValue(res.cost);
            this.productForm.get('sellingPrice')?.patchValue(res.sellingPrice);
            this.productForm
              .get('sellingGroup')
              ?.patchValue({ name: res.sellingGroup });
            this.productForm.get('description')?.patchValue(res.description);
          }),
          takeUntil(this.unsubscribe$)
        )
        .subscribe();
    }
  }
  @Output() close = new EventEmitter();
  public $actionTypeStr$ = signal<{ type: string; actionId: string }>({
    type: '',
    actionId: '',
  });
  public $buyerOrgData$ = signal('');
  private fb = inject(FormBuilder);
  private softParameterService = inject(SoftParameterService);
  private authService = inject(AuthService);
  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(200)]],
      cost: [null, [Validators.required]],
      sellingPrice: [null, [Validators.required]],
      sellingGroup: ['', []],
      description: ['', [Validators.required]],
    });
    this.authService
      .getUser$()
      .pipe(
        switchMap((res) => {
          this.$buyerOrgData$.set(res.buyerOrganziaitonId);
          return this.softParameterService
            .getSellingGroupDescription$(res.buyerOrganziaitonId)
            .pipe(
              map((res) => {
                this.group = res;
                return res;
              })
            );
        }),
        takeUntil(this.unsubscribe$)
      )
      .subscribe();
  }
  onSubmit(): void {
    if (this.productForm.valid) {
      if (this.$actionTypeStr$().type === CrudEnum.ADD) {
        const updatedData = {
          name: this.productForm.get('name')?.value,
          cost: this.productForm.get('cost')?.value,
          sellingPrice: this.productForm.get('sellingPrice')?.value,
          sellingGroup: this.productForm.get('sellingGroup')?.value?.name || '',
          description: this.productForm.get('description')?.value,
          buyerOrganization: this.$buyerOrgData$(),
          quantity: 1,
        };
        this.softParameterService
          .addProduct$(updatedData)
          .pipe(
            map((res) => {
              this.productForm.reset();
              this.close.emit();
            }),
            takeUntil(this.unsubscribe$)
          )
          .subscribe();
      } else {
        const updatedData = {
          name: this.productForm.get('name')?.value,
          cost: Number(this.productForm.get('cost')?.value),
          sellingPrice: Number(this.productForm.get('sellingPrice')?.value),
          sellingGroup: this.productForm.get('sellingGroup')?.value?.name || '',
          description: this.productForm.get('description')?.value,
          buyerOrganization: this.$buyerOrgData$(),
          quantity: 1,
        };

        this.softParameterService
          .updateProduct$(updatedData, this.$actionTypeStr$().actionId)
          .pipe(
            map((res) => {
              this.productForm.reset();
              this.close.emit();
            }),
            takeUntil(this.unsubscribe$)
          )
          .subscribe();
      }
    }
  }
}
