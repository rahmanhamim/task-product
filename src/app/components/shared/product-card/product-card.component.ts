import { Component, inject, Input } from '@angular/core';
import { IProduct } from '../../../model';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { CartService } from '../../../services/cart.service';
import { AsyncPipe } from '@angular/common';
import { map } from 'rxjs';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [NzButtonComponent, AsyncPipe], // Add AsyncPipe
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  @Input({ required: true }) product!: IProduct;

  cartService = inject(CartService);

  isAlreadyInCart$ = this.cartService.cartProducts$.pipe(
    map((items) => items.some((item) => item.id === this.product.id))
  );

  onAddToCart() {
    this.cartService.addProductToCart(this.product);
  }
}
