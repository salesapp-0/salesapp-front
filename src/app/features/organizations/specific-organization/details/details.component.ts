import {Component, inject, OnInit, signal} from '@angular/core';
import {InputSwitchModule} from "primeng/inputswitch";
import {FormsModule} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {map, Observable, switchMap, takeUntil, tap} from "rxjs";
import {unsub} from "../../../../shared/classes/unsub.class";
import {OrganizationsService} from "../../../../shared/services/organizations.service";
import {BuyerOrganization} from "../../../../core/interfaces/buyer-organizations.interface";
import {CommonModule} from "@angular/common";
import {SpecificOrganization} from "../../../../core/interfaces/specific-organization.interface";

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [InputSwitchModule,FormsModule,CommonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent extends unsub implements OnInit{
  checked: boolean = false;
  organization$!:Observable<SpecificOrganization>
  $organizationId$ = signal('')
  private activatedRoute = inject(ActivatedRoute)
  private organizationService = inject(OrganizationsService)
  ngOnInit(): void {
    this.activatedRoute.queryParams.pipe(
      map((params) => {
        let paramId = params['id']
        if(paramId) {
          this.$organizationId$.set(paramId)
            this.getSpecificOrganization(paramId)
        }
      }),takeUntil(this.unsubscribe$)
    ).subscribe()
  }

  getSpecificOrganization(id: string) {
    this.organization$ = this.organizationService.getOrganizationById(id).pipe(
      switchMap((organization) => {
        this.checked = organization.isActive;
        return this.organizationService.getUserById(organization.userId).pipe(
          map((user) => ({
            ...organization,
            user
          })),
          tap(console.log)
        );
      })
    );
  }
  deactivateOrganization() {
    if(this.$organizationId$()) {
      this.organizationService.deactivateOrganization(this.$organizationId$(),this.checked).pipe(
      takeUntil(this.unsubscribe$)
      ).subscribe()
    }
  }
}
