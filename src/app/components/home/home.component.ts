import { Component, inject, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductsService } from '../../services/products.service';
import { ProductCardComponent } from '../shared/product-card/product-card.component';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { TopbarActionsComponent } from '../topbar-actions/topbar-actions.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [
    ProductCardComponent,
    NzButtonComponent,
    NzSpinModule,
    TopbarActionsComponent,
    AsyncPipe,
  ],
})
export class HomeComponent implements OnInit, OnDestroy {
  limit = 5;
  skip = 0;
  category: string | null = null;
  search: string | null = null;

  private route = inject(ActivatedRoute);
  private productsService = inject(ProductsService);
  private routeSub?: Subscription;

  products$ = this.productsService.products$;
  loading$ = this.productsService.isLoading;

  ngOnInit() {
    this.routeSub = this.route.queryParamMap.subscribe(
      (queryParams: ParamMap) => {
        this.search = queryParams.get('search');
        this.limit = queryParams.get('limit') ? +queryParams.get('limit')! : 5;
        this.route.paramMap.subscribe((params: ParamMap) => {
          this.category = params.get('category');
          this.skip = 0; // Reset skip when category changes
          this.productsService.loadProducts({
            limit: this.limit,
            skip: this.skip,
            category: this.category || undefined,
            search: this.search || undefined,
          });
        });
      }
    );
  }

  loadMoreProducts() {
    this.skip += this.limit;
    this.productsService.onLoadMore({
      limit: this.limit,
      skip: this.skip,
      category: this.category || undefined,
      search: this.search || undefined,
    });
  }

  ngOnDestroy() {
    this.routeSub?.unsubscribe();
  }
}
