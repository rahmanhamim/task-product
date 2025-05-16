import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IProduct, IProductCategory } from '../model';
import { BehaviorSubject } from 'rxjs';

const BASE_URL = 'https://dummyjson.com';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private httpClient = inject(HttpClient);

  private productsState = new BehaviorSubject<IProduct[]>([]);
  products$ = this.productsState.asObservable();
  private loading = new BehaviorSubject<boolean>(false);
  isLoading$ = this.loading.asObservable();

  get isLoading() {
    return this.loading;
  }

  private productCategoriesState: IProductCategory[] = [];
  get productCategories(): ReadonlyArray<IProductCategory> {
    return this.productCategoriesState;
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

  loadProducts({
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
    this.loading.next(true);
    this.fetchProducts({ limit, skip, category, search }).subscribe((res) => {
      this.productsState.next(res.products);
      this.loading.next(false);
    });
  }

  onLoadMore({
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
    this.loading.next(true);
    this.fetchProducts({ limit, skip, category, search }).subscribe((res) => {
      this.productsState.next([
        ...this.productsState.getValue(),
        ...res.products,
      ]);
      this.loading.next(false);
    });
  }

  onDeleteProduct(id: number) {
    this.productsState.next(
      this.productsState.getValue().filter((product) => product.id !== id)
    );
  }

  onAddProduct(product: IProduct) {
    this.productsState.next([product, ...this.productsState.getValue()]);
  }

  onUpdateProduct(updatedProductValues: Partial<IProduct>) {
    const products = this.productsState.getValue();
    const productToUpdate = products.find(
      (p) => p.id === updatedProductValues.id
    );

    // payload omit id
    const payload = { ...updatedProductValues, id: undefined };

    if (productToUpdate) {
      this.httpClient
        .put(`${BASE_URL}/products/${updatedProductValues.id}`, payload, {
          headers: { 'Content-Type': 'application/json' },
        })
        .subscribe({
          next: (response) => {
            const updatedProductFromApi: IProduct = {
              ...productToUpdate,
              ...response,
            };

            // Update the products array with the updated product
            const updatedProducts = products.map((p) =>
              p.id === updatedProductValues.id ? updatedProductFromApi : p
            );

            // Emit the updated state
            this.productsState.next(updatedProducts);
          },
          error: (err: unknown) => {
            console.error('Failed to update product:', err);
          },
        });
    } else {
      console.error(`Product with id ${updatedProductValues.id} not found`);
    }
  }

  fetchProductCategories() {
    return this.httpClient.get<IProductCategory[]>(
      `${BASE_URL}/products/categories`,
      {}
    );
  }

  fetchProductById(id: number) {
    return this.httpClient.get<IProduct>(`${BASE_URL}/products/${id}`);
  }
}
