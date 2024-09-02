import {Component, inject, OnInit} from '@angular/core';
import {InputSwitchModule} from "primeng/inputswitch";
import {FormsModule} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {map, Observable, takeUntil} from "rxjs";
import {unsub} from "../../../../shared/classes/unsub.class";
import {OrganizationsService} from "../../../../shared/services/organizations.service";
import {BuyerOrganization} from "../../../../core/interfaces/buyer-organizations.interface";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [InputSwitchModule,FormsModule,CommonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent extends unsub implements OnInit{
  checked: boolean = false;
  organization$!:Observable<BuyerOrganization>
  private activatedRoute = inject(ActivatedRoute)
  private organizationService = inject(OrganizationsService)
  ngOnInit(): void {
    this.activatedRoute.queryParams.pipe(
      map((params) => {
        let paramId = params['id']
        if(paramId) {
            this.getSpecificOrganization(paramId)
        }
      }),takeUntil(this.unsubscribe$)
    ).subscribe()
  }

  getSpecificOrganization(id:string) {
   this.organization$ = this.organizationService.getOrganizationById(id).pipe(
     map((res) => {
        this.checked = res.isActive
       return res
     })
   )
  }
}
