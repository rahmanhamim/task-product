import { ICartItemState } from './cart/cart.reducers';
import { IProductState } from './product/product.reducer';

export interface AppState {
  cart: ICartItemState;
  productState: IProductState;
}
