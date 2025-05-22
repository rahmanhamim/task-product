import { createReducer, on } from '@ngrx/store';
import { IProduct } from '../../model';
import * as productActions from './product.action';

export interface IProductState {
  products: IProduct[];
  error: string | null;
}

export const initialState: IProductState = {
  products: [],
  error: null,
};

export const productReducer = createReducer(
  initialState,
  on(productActions.loadProductsSuccess, (state, { products }) => ({
    ...state,
    products,
    error: null,
  })),
  on(productActions.loadProductsFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
