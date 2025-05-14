import { Component, inject, Input } from '@angular/core';
import { IProduct } from '../../../model';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { CartService } from '../../../services/cart.service';
import { AsyncPipe } from '@angular/common';
import { map } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [NzButtonComponent, AsyncPipe, RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  @Input({ required: true }) product!: IProduct;

  private cartService = inject(CartService);

  isAlreadyInCart$ = this.cartService.cartProducts$.pipe(
    map((items) => items.some((item) => item.id === this.product.id))
  );

  onAddToCart() {
    this.cartService.addProductToCart(this.product);
  }
}
