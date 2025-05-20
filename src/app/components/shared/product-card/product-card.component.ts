import { Component, inject, Input, OnDestroy } from '@angular/core';
import { IProduct } from '../../../model';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { CartService } from '../../../services/cart.service';
import { AsyncPipe } from '@angular/common';
import { map, Subscription } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { ProductsService } from '../../../services/products.service';
import { EditProductComponent } from '../edit-product/edit-product.component';
import { AuthService } from '../../../services/auth.service';
import { Store } from '@ngrx/store';
import { addToCart } from '../../../store/cart.actions';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [NzButtonComponent, AsyncPipe, RouterLink, EditProductComponent],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent implements OnDestroy {
  @Input({ required: true }) product!: IProduct;

  private store = inject(Store);

  private router = inject(Router);
  private cartService = inject(CartService);
  private productService = inject(ProductsService);
  private authService = inject(AuthService);

  loginSubscription?: Subscription;

  isLoggedIn$ = this.authService.isLoggedIn();

  cartProductCount$ = this.cartService.cartProducts$.pipe(
    map(
      (items) =>
        items.find((item) => item.id === this.product.id)?.quantity || 0
    )
  );

  onAddToCart() {
    this.loginSubscription = this.isLoggedIn$.subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        this.cartService.addProductToCart(this.product);
      } else {
        this.router.navigate(['/login']);
      }
    });

    this.store.dispatch(addToCart());
  }

  onDeleteProduct() {
    this.isLoggedIn$.subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        this.productService.onDeleteProduct(this.product.id);
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  ngOnDestroy() {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }
}
