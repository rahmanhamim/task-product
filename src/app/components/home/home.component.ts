// src/app/home/home.component.ts
import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { IProduct } from '../../model';
import { ProductCardComponent } from '../shared/product-card/product-card.component';
import { NzButtonComponent } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [ProductCardComponent, NzButtonComponent],
})
export class HomeComponent implements OnInit {
  products: IProduct[] = [];
  limit = 5;
  skip = 5;
  loading = true;

  private productsService = inject(ProductsService);

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.loading = true;
    this.productsService
      .fetchProducts(this.limit, this.skip)
      .subscribe((res) => {
        this.products = [...this.products, ...res.products];
        this.skip += this.limit;
        this.loading = false;
      });
  }
}
