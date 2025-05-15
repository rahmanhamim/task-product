import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProductViewComponent } from './components/home/product-view/product-view.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'product/:id', component: ProductViewComponent },
      { path: 'products/category/:category', component: HomeComponent },
    ],
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [{ path: 'login', component: LoginComponent }],
  },
];
