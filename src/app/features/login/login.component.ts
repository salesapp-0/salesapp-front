import { Component, inject, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { Button, ButtonModule } from 'primeng/button';
import { AuthService } from '../../shared/services/auth.service';
import { catchError, map, of, takeUntil } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { unsub } from '../../shared/classes/unsub.class';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    PasswordModule,
    FloatLabelModule,
    InputTextModule,
    CheckboxModule,
    ButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent extends unsub implements OnInit {
  loginForm!: FormGroup;
  $isError$ = signal(false);
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  ngOnInit(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedUsername = localStorage.getItem('username');
      const savedPassword = localStorage.getItem('password');

      this.loginForm = this.fb.group({
        username: [
          savedUsername || '',
          [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(30),
            Validators.pattern('^[^s]+(s+[^s]+)*$'),
          ],
        ],
        password: [
          savedPassword || '',
          [Validators.required, Validators.minLength(6)],
        ],
        rememberMe: [!!savedUsername],
      });
    } else {
      this.loginForm = this.fb.group({
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(30),
            Validators.pattern('^[^s]+(s+[^s]+)*$'),
          ],
        ],
        password: ['', [Validators.required, Validators.minLength(6)]],
        rememberMe: [false],
      });
    }
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const formValue = this.loginForm.value;
      this.authService
        .login$(formValue)
        .pipe(
          catchError((err) => {
            if (err.error.message === 'Invalid credentials') {
              this.loginForm.reset();
              this.$isError$.set(true);
            }
            return of(null);
          }),
          map((res) => {
            if (res) {
              if (formValue.rememberMe) {
                localStorage.setItem('username', formValue.username);
                // this should be incripted
                localStorage.setItem('password', formValue.password);
              } else {
                localStorage.removeItem('username');
                localStorage.removeItem('password');
              }
              this.router.navigate(['/main-page']);
              this.$isError$.set(false);
            } else {
              this.router.navigate(['/login']);
              this.$isError$.set(true);
            }
          }),
          takeUntil(this.unsubscribe$)
        )
        .subscribe();
    }
  }
}
