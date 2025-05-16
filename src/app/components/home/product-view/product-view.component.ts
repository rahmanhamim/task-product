import { Component, OnDestroy } from '@angular/core';
import { IProduct } from '../../../model';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../services/products.service';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../../services/cart.service';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { Subscription } from 'rxjs';

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
    private cartService: CartService
  ) {}

  productSubscription?: Subscription;

  ngOnInit(): void {
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
      this.cartService.addProductToCart(this.product);
    }
  }

  onImageClick(image: string) {
    this.selectedImage = image;
  }

  ngOnDestroy(): void {
    this.productSubscription?.unsubscribe();
  }
}
