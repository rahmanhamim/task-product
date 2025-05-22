import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { IProductState } from './product.reducer';

export const selectProductState = (state: AppState) => state;

export const selectProducts = createSelector(
  selectProductState,
  (state) => state.productState.products
);
