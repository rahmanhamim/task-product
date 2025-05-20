import { createAction } from '@ngrx/store';
import { IProduct } from '../model';

export const addToCart = createAction('[Cart] Add to cart');

export const removeFromCart = createAction('[Cart] Remove from cart');
