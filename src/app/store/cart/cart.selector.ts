import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

export const selectCartState = (state: AppState) => state.cart;

export const selectCartItems = createSelector(
  selectCartState,
  (cartState) => cartState.cart
);

export const selectCartTotalPrice = createSelector(selectCartItems, (items) =>
  items.reduce((total, item) => total + item.price * (item.quantity || 1), 0)
);

export const selectCartTotalItemsCount = createSelector(
  selectCartItems,
  (items) => items.reduce((total, item) => total + (item.quantity || 0), 0)
);
