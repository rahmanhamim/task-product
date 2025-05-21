import { Component, inject, Input } from '@angular/core';
import { ICartItem } from '../../../model';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { CurrencyPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import {
  addToCart,
  removeProductFromCart,
} from '../../../store/cart/cart.actions';
import { selectCartItems } from '../../../store/cart/cart.selector';

@Component({
  selector: 'app-cart-product-card',
  standalone: true,
  imports: [NzButtonComponent, CurrencyPipe],
  templateUrl: './cart-product-card.component.html',
  styleUrl: './cart-product-card.component.css',
})
export class CartProductCardComponent {
  @Input({ required: true }) cartProduct!: ICartItem;

  private store = inject<Store<AppState>>(Store);

  cartProducts?: ICartItem[];

  ngOnInit() {
    this.store.select(selectCartItems).subscribe({
      next: (cartItems) => {
        this.cartProducts = cartItems;
      },
    });
  }

  onAddToCart() {
    this.store.dispatch(addToCart({ product: this.cartProduct }));
  }

  onRemoveFromCart() {
    this.store.dispatch(removeProductFromCart({ id: this.cartProduct.id }));
  }
}
