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
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SoftParameterService } from '../../../../shared/services/soft/soft-parameter.service';
import { map, takeUntil } from 'rxjs';
import { MultiSelectModule } from 'primeng/multiselect';
import { CrudEnum } from '../../../../core/enums/crud.enum';
import { unsub } from '../../../../shared/classes/unsub.class';

@Component({
  selector: 'app-role-premission-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    InputNumberModule,
    DropdownModule,
    InputTextareaModule,
    FloatLabelModule,
    MultiSelectModule,
  ],
  templateUrl: './role-premission-modal.component.html',
  styleUrl: './role-premission-modal.component.scss',
})
export class RolePremissionModalComponent extends unsub implements OnInit {
  productForm!: FormGroup;
  @Output() close = new EventEmitter();
  @Input() buyerOrgid!: string;
  @Input() set actionType(val: { type: string; actionId: string }) {
    this.$actionTypeStr$.set(val);
    if (val.type === CrudEnum.ADD) {
    } else {
      this.softParameterService
        .findSpecificRole$(val.actionId)
        .pipe(
          map((res) => {
            console.log(res[0]);
            this.productForm.get('name')?.patchValue(res[0].name);
            const permissionValues = res[0].rolePermissions.map((item: any) => {
              return { name: item.permission.nameKa };
            });
            this.productForm.get('premissions')?.patchValue(permissionValues);
            this.productForm.get('description')?.patchValue(res[0].description);
          }),
          takeUntil(this.unsubscribe$)
        )
        .subscribe();
    }
  }
  group: any | undefined;
  $actionTypeStr$ = signal({
    type: '',
    actionId: '',
  });
  private fb = inject(FormBuilder);
  private softParameterService = inject(SoftParameterService);
  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(200)]],
      premissions: [this.fb.array([]), [Validators.required]],
      description: ['', [Validators.required]],
    });

    this.productForm.valueChanges.subscribe((value) => {
      console.log('value', value);
    });

    this.softParameterService
      .getPermissions$()
      .pipe(
        map((res) => {
          this.group = res.map((permissions: any) => {
            return { name: permissions.nameKa };
          });
        }),
        takeUntil(this.unsubscribe$)
      )
      .subscribe();
  }

  onSubmit() {
    if (this.productForm.valid) {
      if (this.$actionTypeStr$().type === CrudEnum.ADD) {
        const premissionNames = this.productForm.get('premissions')?.value;
        const changedPremissionNames = premissionNames.map(
          (premissionName: { name: string }) => premissionName.name
        );
        const addRole = {
          name: this.productForm.get('name')?.value,
          permissionNames: changedPremissionNames,
          description: this.productForm.get('description')?.value || '',
          BuyerOrganization: this.$actionTypeStr$().actionId,
        };
        this.softParameterService
          .addRoles$(addRole)
          .pipe(
            map((res) => {
              this.close.emit();
              this.productForm.reset();
            }),
            takeUntil(this.unsubscribe$)
          )
          .subscribe();
      } else {
        const premissionNames = this.productForm.get('premissions')?.value;
        const changedPremissionNames = premissionNames.map(
          (premissionName: { name: string }) => premissionName.name
        );
        const addRole = {
          name: this.productForm.get('name')?.value,
          permissionNames: changedPremissionNames,
          description: this.productForm.get('description')?.value || '',
          BuyerOrganization: this.buyerOrgid,
        };
        this.softParameterService
          .updateRole$(addRole, this.$actionTypeStr$().actionId)
          .pipe(
            map((res) => {
              this.close.emit();
              this.productForm.reset();
            }),
            takeUntil(this.unsubscribe$)
          )
          .subscribe();
      }
    }
  }
}
