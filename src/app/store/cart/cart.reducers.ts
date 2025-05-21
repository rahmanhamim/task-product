// cart.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { addToCart, removeProductFromCart } from './cart.actions';
import { ICartItem } from '../../model';

export interface ICartItemState {
  cart: ICartItem[];
}

export const initialState: ICartItemState = {
  cart: [],
};

export const cartReducer = createReducer(
  initialState,
  on(addToCart, (state, { product }) => {
    const existingProductIndex = state.cart.findIndex(
      (p) => p.id === product.id
    );

    let updatedCart: ICartItem[];

    if (existingProductIndex !== -1) {
      // Product exists, increment quantity
      updatedCart = state.cart.map((item, index) =>
        index === existingProductIndex
          ? { ...item, quantity: (item.quantity || 0) + 1 }
          : item
      );
    } else {
      // New product, add with quantity 1
      const productToAdd: ICartItem = { ...product, quantity: 1 };
      updatedCart = [...state.cart, productToAdd];
    }

    return {
      ...state,
      cart: updatedCart,
    };
  }),
  on(removeProductFromCart, (state, { id }) => {
    const current = state.cart;

    const updatedCart = current.reduce<ICartItem[]>((acc, item) => {
      if (item.id === id) {
        if ((item.quantity || 0) > 1) {
          acc.push({ ...item, quantity: (item.quantity || 0) - 1 });
        }
      } else {
        acc.push(item);
      }
      return acc;
    }, []);

    return {
      ...state,
      cart: updatedCart,
    };
  })
);
