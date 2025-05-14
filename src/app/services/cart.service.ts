import { BehaviorSubject, map } from 'rxjs';
import { Injectable } from '@angular/core';
import { ICartItem } from '../model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartProductsSubject = new BehaviorSubject<ICartItem[]>([]);
  cartProducts$ = this.cartProductsSubject.asObservable();

  get cartTotalItemsCount$() {
    return this.cartProducts$.pipe(
      map((items) => items.reduce((acc, item) => acc + (item.quantity || 0), 0))
    );
  }

  get totalPrice$() {
    return this.cartProducts$.pipe(
      map((items) =>
        items.reduce(
          (acc, item) => acc + (item.price || 0) * (item.quantity || 0),
          0
        )
      )
    );
  }

  addProductToCart(product: ICartItem): void {
    const current = this.cartProductsSubject.getValue();
    const existingProductIndex = current.findIndex((p) => p.id === product.id);

    let updatedCart: ICartItem[];

    if (existingProductIndex !== -1) {
      updatedCart = current.map((item, index) =>
        index === existingProductIndex
          ? { ...item, quantity: (item?.quantity || 0) + 1 }
          : item
      );
    } else {
      const productToAdd = { ...product, quantity: 1 };
      updatedCart = [...current, productToAdd];
    }

    this.cartProductsSubject.next(updatedCart);
  }

  removeProductFromCart(productId: number): void {
    const current = this.cartProductsSubject.getValue();

    const updatedCart = current.reduce<ICartItem[]>((acc, item) => {
      if (item.id === productId) {
        if ((item.quantity || 0) > 1) {
          acc.push({ ...item, quantity: (item.quantity || 0) - 1 });
        }
      } else {
        acc.push(item);
      }
      return acc;
    }, []);

    this.cartProductsSubject.next(updatedCart);
  }
}
