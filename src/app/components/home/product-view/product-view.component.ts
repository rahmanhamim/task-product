import { Component, Input, OnDestroy } from '@angular/core';
import { IProduct } from '../../../model';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../services/products.service';
import { CurrencyPipe } from '@angular/common';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import { addToCart } from '../../../store/cart/cart.actions';
import { loadProducts } from '../../../store/product/product.action';
import {
  selectProducts,
  selectProductState,
} from '../../../store/product/product.selector';

@Component({
  selector: 'app-product-view',
  imports: [CurrencyPipe, NzButtonComponent, NzSpinModule],
  templateUrl: './product-view.component.html',
  styleUrl: './product-view.component.css',
})
export class ProductViewComponent implements OnDestroy {
  product: IProduct | null = null;
  isFetching: boolean = true;
  error: string | null = null;

  selectedImage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private store: Store<AppState>
  ) {
    this.store.dispatch(loadProducts());
    this.ngrxProducts$ = this.store.select(selectProducts);
  }

  productSubscription?: Subscription;

  // ----------------------------------------------------------
  // ----------------------------------------------------------

  ngrxProducts$?: Observable<IProduct[] | null>;

  // ----------------------------------------------------------
  // ----------------------------------------------------------

  ngOnInit(): void {
    this.ngrxProducts$?.subscribe((products) => {
      console.log('products from ngrx', products);
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productSubscription = this.productsService
        .fetchProductById(+id)
        .subscribe({
          next: (product) => {
            this.product = product;
          },
          error: (err) => {
            this.error = 'Failed to load product';
            console.error(err);
          },
          complete: () => {
            this.isFetching = false;
          },
        });
    }
  }

  onAddToCart() {
    if (this.product) {
      this.store.dispatch(addToCart({ product: this.product }));
    }
  }

  onImageClick(image: string) {
    this.selectedImage = image;
  }

  ngOnDestroy(): void {
    this.productSubscription?.unsubscribe();
  }
}
