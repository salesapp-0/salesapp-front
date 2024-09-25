import {
  Component,
  EventEmitter,
  inject,
  Input,
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
import { SoftParameterService } from '../../../../shared/services/soft/soft-parameter.service';
import { CrudEnum } from '../../../../core/enums/crud.enum';
import { map, takeUntil } from 'rxjs';
import { unsub } from '../../../../shared/classes/unsub.class';

@Component({
  selector: 'app-action-modal',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './action-modal.component.html',
  styleUrl: './action-modal.component.scss',
})
export class ActionModalComponent extends unsub {
  actionForm!: FormGroup;
  @Input({ alias: 'requestType' }) set _(type: {
    type: string;
    actionId: string;
  }) {
    this.$requestType$.set(type);
    if (type.type === CrudEnum.UPDATE) {
      this.softParameterService
        .getSpecificActionOption$(type.actionId)
        .pipe(
          map((res) => {
            this.$editId$.set(res.id);
            this.actionForm.get('action')?.patchValue(res.name);
          }),
          takeUntil(this.unsubscribe$)
        )
        .subscribe();
    }
  }
  @Input() buyerOrgId!: string;
  @Output() EmitReqType = new EventEmitter();
  @Output() close = new EventEmitter();
  $requestType$ = signal<{ type: string; actionId: string }>({
    type: '',
    actionId: '',
  });
  $editId$ = signal('');
  private fb = inject(FormBuilder);
  private softParameterService = inject(SoftParameterService);
  constructor() {
    super();
    this.actionForm = this.fb.group({
      action: ['', [Validators.required, Validators.maxLength(15)]],
    });
  }

  onSubmit() {
    if (this.actionForm.valid) {
      if (this.$requestType$().type === CrudEnum.ADD) {
        const actionOption = {
          name: this.actionForm.get('action')?.value,
          buyerOrganization: { id: this.$requestType$().actionId },
        };
        this.softParameterService
          .createActionOption$(actionOption)
          .pipe(
            map((res) => {
              this.close.emit();
              this.actionForm.reset();
              this.softParameterService.refetchAction();
            }),
            takeUntil(this.unsubscribe$)
          )
          .subscribe();
      } else if (this.$requestType$().type === CrudEnum.UPDATE) {
        const actionOption = {
          buyerOrganization: { id: this.buyerOrgId },
          name: this.actionForm.get('action')?.value,
        };

        this.softParameterService
          .updateActionOption$(actionOption, this.$requestType$().actionId)
          .pipe(
            map((res) => {
              this.close.emit();
              this.actionForm.reset();
              this.softParameterService.refetchAction();
            }),
            takeUntil(this.unsubscribe$)
          )
          .subscribe();
      }
    }
  }
}
