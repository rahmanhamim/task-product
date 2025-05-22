import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as productActions from './product.action';
import { catchError, map, of, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IProduct } from '../../model';

@Injectable()
export class ProductEffects {
  action$ = inject(Actions);

  http = inject(HttpClient);
  constructor() {}

  getProducts() {
    return this.http
      .get<{ products: IProduct[] }>('https://dummyjson.com/products')
      .pipe(
        map((products) => {
          return products;
        })
      );
  }

  loadProducts$ = createEffect(() =>
    this.action$.pipe(
      ofType(productActions.loadProducts),
      switchMap(() =>
        this.getProducts().pipe(
          map((res) =>
            productActions.loadProductsSuccess({ products: res.products })
          ),
          catchError((error) =>
            of(productActions.loadProductsFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
