import { Component, inject, Input, OnDestroy } from '@angular/core';
import { IProduct } from '../../../model';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { AsyncPipe } from '@angular/common';
import { map, Subscription } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { ProductsService } from '../../../services/products.service';
import { EditProductComponent } from '../edit-product/edit-product.component';
import { AuthService } from '../../../services/auth.service';
import { Store } from '@ngrx/store';
import { addToCart } from '../../../store/cart/cart.actions';
import { AppState } from '../../../store/app.state';
import {
  selectCartItems,
  selectCartTotalItemsCount,
} from '../../../store/cart/cart.selector';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [NzButtonComponent, AsyncPipe, RouterLink, EditProductComponent],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent implements OnDestroy {
  @Input({ required: true }) product!: IProduct;

  private store = inject<Store<AppState>>(Store);

  private router = inject(Router);
  private productService = inject(ProductsService);
  private authService = inject(AuthService);

  loginSubscription?: Subscription;

  isLoggedIn$ = this.authService.isLoggedIn();

  cartProductCount$ = this.store
    .select(selectCartItems)
    .pipe(
      map(
        (items) => items.find((item) => item.id === this.product.id)?.quantity
      )
    );

  onAddToCart() {
    this.loginSubscription = this.isLoggedIn$.subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        this.store.dispatch(addToCart({ product: this.product }));
      } else {
        this.router.navigate(['/login']);
      }
    });
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
