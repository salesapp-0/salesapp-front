import {Component, inject, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {map, Observable} from "rxjs";
import {User} from "../../../core/interfaces/user.interface";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  private authService = inject(AuthService)
  user$!:Observable<User>
  ngOnInit() {
   this.user$ = this.authService.getUser$().pipe(
      map((userData) => userData)
    )
  }

}
