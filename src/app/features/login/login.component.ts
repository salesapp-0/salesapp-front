import {Component, inject, OnInit, signal} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {PasswordModule} from "primeng/password";
import {FloatLabelModule} from "primeng/floatlabel";
import {InputTextModule} from "primeng/inputtext";
import {CheckboxModule} from "primeng/checkbox";
import {Button, ButtonModule} from "primeng/button";
import {AuthService} from "../../shared/services/auth.service";
import {catchError, map, of, takeUntil} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {unsub} from "../../shared/classes/unsub.class";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, PasswordModule, FloatLabelModule, InputTextModule, CheckboxModule, ButtonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent extends unsub implements OnInit{
  loginForm!: FormGroup;
  $isError$ = signal(false)
  private fb = inject(FormBuilder)
  private authService = inject(AuthService)

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const formValue = this.loginForm.value;
      this.authService.login$(formValue).pipe(
        catchError((err) => {
          if(err.error.message === "Invalid credentials") {
            this.loginForm.reset()
            this.$isError$.set(true)
          }
          return of(null);
        }),
        map((res) => {
          res ? this.$isError$.set(false) : this.$isError$.set(true)
        }),
        takeUntil(this.unsubscribe$)
      ).subscribe()
    }
  }
}
