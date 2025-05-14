import { Component, inject, Input } from '@angular/core';
import { ICartItem } from '../../../model';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { CartService } from '../../../services/cart.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart-product-card',
  standalone: true,
  imports: [NzButtonComponent, CurrencyPipe],
  templateUrl: './cart-product-card.component.html',
  styleUrl: './cart-product-card.component.css',
})
export class CartProductCardComponent {
  @Input({ required: true }) cartProduct!: ICartItem;

  private cartService = inject(CartService);

  onAddToCart() {
    this.cartService.addProductToCart(this.cartProduct);
  }

  onRemoveFromCart() {
    this.cartService.removeProductFromCart(this.cartProduct.id);
  }
}
