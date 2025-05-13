import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [{ path: '', component: HomeComponent }],
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      //   { path: 'login', component: LoginComponent },
      //   { path: 'signup', component: SignupComponent },
    ],
  },
];
