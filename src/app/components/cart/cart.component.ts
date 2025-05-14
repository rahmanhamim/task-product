import { Component, inject } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { CartProductCardComponent } from '../shared/cart-product-card/cart-product-card.component';
import { ProductsService } from '../../services/products.service';
import { ShippingComponent } from './shipping/shipping.component';

@Component({
  selector: 'app-cart',
  imports: [
    NzButtonModule,
    NzDrawerModule,
    NzSpaceModule,
    CartProductCardComponent,
    ShippingComponent,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  title = 'Cart ';
  visible = false;

  productService = inject(ProductsService);

  cartProducts = this.productService.cartProducts;

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }
}
