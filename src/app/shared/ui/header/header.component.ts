import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { map, Observable } from 'rxjs';
import { User } from '../../../core/interfaces/user.interface';
import { CommonModule } from '@angular/common';
import { NavigateService } from '../../services/navigate.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  private authService = inject(AuthService);
  private navigateService = inject(NavigateService);
  user$!: Observable<User>;
  ngOnInit() {
    this.user$ = this.authService.getUser$().pipe(map((userData) => userData));
  }
  onNavigate(url: string) {
    this.navigateService.navigateTo(url);
  }
}
