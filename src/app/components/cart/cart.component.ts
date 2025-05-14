import { Component, inject } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { CartProductCardComponent } from '../shared/cart-product-card/cart-product-card.component';
import { ShippingComponent } from './shipping/shipping.component';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { CartService } from '../../services/cart.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [
    NzButtonModule,
    NzDrawerModule,
    NzSpaceModule,
    CartProductCardComponent,
    ShippingComponent,
    NzBadgeModule,
    AsyncPipe,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  title = 'Cart ';
  visible = false;

  private cartService = inject(CartService);

  cartProducts = this.cartService.cartProducts$;
  cartTotalItemsCount = this.cartService.cartTotalItemsCount$;

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }
}
