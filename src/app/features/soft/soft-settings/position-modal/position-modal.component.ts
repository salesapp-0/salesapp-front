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
import { MultiSelectModule } from 'primeng/multiselect';
import { CrudEnum } from '../../../../core/enums/crud.enum';
import { SoftParameterService } from '../../../../shared/services/soft/soft-parameter.service';
import { AuthService } from '../../../../shared/services/auth.service';
import { map, switchMap, takeUntil } from 'rxjs';
import { unsub } from '../../../../shared/classes/unsub.class';
import { log } from 'console';
@Component({
  selector: 'app-position-modal',
  standalone: true,
  imports: [MultiSelectModule, ReactiveFormsModule, FormsModule],
  templateUrl: './position-modal.component.html',
  styleUrl: './position-modal.component.scss',
})
export class PositionModalComponent extends unsub implements OnInit {
  @Output() close = new EventEmitter();
  @Input() set actionType(val: { type: string; actionId: string }) {
    this.$actionTypeStr$.set(val);
    if (val.type === CrudEnum.ADD) {
    } else {
      this.softParameterService
        .getSpecificPositionOption$(val.actionId)
        .pipe(
          map((res) => {
            this.positionForm.get('name')?.patchValue(res.name);
          }),
          takeUntil(this.unsubscribe$)
        )
        .subscribe();
    }
  }
  $actionTypeStr$ = signal<{ type: string; actionId: string }>({
    type: '',
    actionId: '',
  });
  positionSelect!: { name: string }[];
  positionForm!: FormGroup;
  $buyerOrgData$ = signal('');
  private fb = inject(FormBuilder);
  private softParameterService = inject(SoftParameterService);
  private authService = inject(AuthService);
  ngOnInit(): void {
    this.positionForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(200)]],
      saleGroup: ['', [Validators.required]],
    });
    this.authService
      .getUser$()
      .pipe(
        switchMap((res) => {
          this.$buyerOrgData$.set(res.buyerOrganziaitonId);
          return this.softParameterService
            .getPositionDescription$(res.buyerOrganziaitonId)
            .pipe(
              map((res) => {
                this.positionSelect = res;
                return res;
              })
            );
        }),
        takeUntil(this.unsubscribe$)
      )
      .subscribe();
  }
  onSubmit() {
    console.log(this.positionForm.valid);

    if (this.positionForm.valid) {
      if (this.$actionTypeStr$().type === CrudEnum.ADD) {
        const position = {
          ...this.positionForm.value,
        };
        const updatedData = {
          description: position.saleGroup.map((item: any) => ({
            description: item.name,
          }))[0].description,
          name: position.name,
          buyerOrganization: this.$buyerOrgData$(),
        };

        this.softParameterService
          .addPosition$(updatedData)
          .pipe(
            map((res) => {
              this.close.emit();
              this.positionForm.reset();
            }),
            takeUntil(this.unsubscribe$)
          )
          .subscribe();
      } else {
        const position = {
          ...this.positionForm.value,
        };
        const updatedData = {
          description: position.saleGroup.map((item: any) => ({
            description: item.name,
          }))[0].description,
          name: position.name,
        };

        this.softParameterService
          .updatePosition$(updatedData, this.$actionTypeStr$().actionId)
          .pipe(
            map((res) => {
              this.close.emit();
              this.positionForm.reset();
            }),
            takeUntil(this.unsubscribe$)
          )
          .subscribe();
      }
    }
  }
}
