import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IProduct, IProductCategory } from '../model';

const BASE_URL = 'https://dummyjson.com';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private httpClient = inject(HttpClient);

  private productCategoriesState: IProductCategory[] = [];
  get productCategories(): ReadonlyArray<IProductCategory> {
    return this.productCategoriesState;
  }

  fetchProductCategories() {
    return this.httpClient.get<IProductCategory[]>(
      `${BASE_URL}/products/categories`,
      {}
    );
  }

  fetchProducts(limit: number, skip: number) {
    return this.httpClient.get<{ products: IProduct[] }>(
      `${BASE_URL}/products?limit=${limit}&skip=${skip}`
    );
  }
}
