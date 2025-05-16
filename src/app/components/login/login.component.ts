import { Component, DestroyRef, inject, OnDestroy } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { AuthService } from '../../services/auth.service';
import { IUser } from '../../model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NzInputModule, NzButtonComponent, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnDestroy {
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  loginSubscription?: Subscription;

  loading = false;

  form = new FormGroup({
    username: new FormControl('emilys', {
      validators: [Validators.required],
    }),
    password: new FormControl('emilyspass', {
      validators: [Validators.required, Validators.minLength(6)],
    }),
  });

  get emailIsInvalid() {
    return (
      this.form.controls.username.touched &&
      this.form.controls.username.dirty &&
      this.form.controls.username.invalid
    );
  }

  get passwordIsInvalid() {
    return (
      this.form.controls.password.touched &&
      this.form.controls.password.dirty &&
      this.form.controls.password.invalid
    );
  }

  logout(): void {
    this.authService.logout();
  }

  onSubmit() {
    this.loading = true;
    const enteredUsername = this.form.value.username;
    const enteredPassword = this.form.value.password;

    if (!this.form.valid || !enteredUsername || !enteredPassword) {
      return;
    }

    this.loginSubscription = this.authService
      .login({ username: enteredUsername, password: enteredPassword })
      .subscribe({
        next: (user: IUser) => {
          this.authService.setUser(user);
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          this.router.navigate([returnUrl]);
        },
        error: (err) => {
          console.error('Login failed:', err);
        },
        complete: () => {
          this.loading = false;
        },
      });
  }

  ngOnDestroy() {
    this.loginSubscription?.unsubscribe();
  }
}
