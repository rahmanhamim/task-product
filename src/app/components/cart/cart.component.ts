import { Component, inject } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { CartProductCardComponent } from '../shared/cart-product-card/cart-product-card.component';
import { ShippingComponent } from './shipping/shipping.component';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { ICartItem } from '../../model';
import {
  selectCartItems,
  selectCartTotalItemsCount,
} from '../../store/cart/cart.selector';

@Component({
  selector: 'app-cart',
  imports: [
    NzButtonModule,
    NzDrawerModule,
    NzSpaceModule,
    CartProductCardComponent,
    ShippingComponent,
    NzBadgeModule,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  title = 'Cart ';
  visible = false;

  private store = inject<Store<AppState>>(Store);

  cartProducts?: ICartItem[];
  cartTotalItemsCount?: number;

  ngOnInit() {
    this.store.select(selectCartItems).subscribe({
      next: (cartItems) => {
        this.cartProducts = cartItems;
      },
    });
    this.store.select(selectCartTotalItemsCount).subscribe({
      next: (count) => {
        this.cartTotalItemsCount = count;
      },
    });
  }

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }
}
