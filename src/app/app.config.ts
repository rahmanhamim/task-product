import {
  ApplicationConfig,
  isDevMode,
  provideZoneChangeDetection,
} from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withRouterConfig,
} from '@angular/router';

import {
  HttpHandlerFn,
  HttpRequest,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './app.routes';
import { cartReducer } from './store/cart/cart.reducers';
import { ProductEffects } from './store/product/product.effect';
import { productReducer } from './store/product/product.reducer';

function loggingInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  // console.log('Outgoing request', req);
  return next(req);
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withComponentInputBinding(),
      withRouterConfig({
        paramsInheritanceStrategy: 'always',
      })
    ),
    provideHttpClient(withInterceptors([loggingInterceptor])),
    provideAnimationsAsync(),
    provideStore(),
    provideState({ name: 'cart', reducer: cartReducer }),
    provideState({ name: 'productState', reducer: productReducer }),
    provideEffects(ProductEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
};
