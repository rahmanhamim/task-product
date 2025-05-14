import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ProductsService } from '../../services/products.service';
import { IProduct } from '../../model';
import { ProductCardComponent } from '../shared/product-card/product-card.component';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { SearchFiltersComponent } from '../search-filters/search-filters.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [
    ProductCardComponent,
    NzButtonComponent,
    NzSpinModule,
    SearchFiltersComponent,
  ],
})
export class HomeComponent implements OnInit, OnDestroy {
  products: IProduct[] = [];
  limit = 5;
  skip = 0;
  loading = true;
  category: string | null = null;

  private route = inject(ActivatedRoute);
  private productsService = inject(ProductsService);
  private routeSub?: Subscription;

  ngOnInit() {
    this.routeSub = this.route.paramMap.subscribe((params: ParamMap) => {
      this.category = params.get('category');
      this.products = [];
      this.skip = 0;
      this.loadProducts();
    });
  }

  loadProducts() {
    this.loading = true;
    this.productsService
      .fetchProducts({
        limit: this.limit,
        skip: this.skip,
        category: this.category ?? undefined,
      })
      .subscribe((res) => {
        this.products = [...this.products, ...res.products];
        this.skip += this.limit;
        this.loading = false;
      });
  }

  ngOnDestroy() {
    this.routeSub?.unsubscribe();
  }
}
