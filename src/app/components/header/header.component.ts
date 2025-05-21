import { Component, inject } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CartComponent } from '../cart/cart.component';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AsyncPipe } from '@angular/common';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ICartItem } from '../../model';
import { AppState } from '../../store/app.state';
import { ICartItemState } from '../../store/cart/cart.reducers';

@Component({
  selector: 'app-header',
  imports: [
    NzButtonModule,
    CartComponent,
    RouterLink,
    AsyncPipe,
    NzDropDownModule,
    NzButtonModule,
    AsyncPipe,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  private authService = inject(AuthService);

  currentUser = this.authService.user$;

  logout(): void {
    this.authService.logout();
  }
}
