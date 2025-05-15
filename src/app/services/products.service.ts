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

  fetchProducts({
    limit,
    skip,
    category,
    search,
  }: {
    limit: number;
    skip: number;
    category?: string;
    search?: string;
  }) {
    let url = category
      ? `${BASE_URL}/products/category/${category}`
      : `${BASE_URL}/products`;

    // Add search parameter if provided
    if (search) {
      url = `${BASE_URL}/products/search?q=${encodeURIComponent(search)}`;
    }

    // Append limit and skip parameters
    url += `${search ? '&' : '?'}limit=${limit}&skip=${skip}`;

    return this.httpClient.get<{ products: IProduct[] }>(url);
  }

  fetchProductById(id: number) {
    return this.httpClient.get<IProduct>(`${BASE_URL}/products/${id}`);
  }
}
