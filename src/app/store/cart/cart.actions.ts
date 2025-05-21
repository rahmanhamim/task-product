import { createAction, props } from '@ngrx/store';
import { IProduct } from '../../model';

export const addToCart = createAction(
  '[Cart] Add to cart',
  props<{ product: IProduct }>()
);

export const removeProductFromCart = createAction(
  '[Cart] Remove from cart',
  props<{ id: number }>()
);
