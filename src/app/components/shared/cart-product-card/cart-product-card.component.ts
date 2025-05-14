import { Component, Input } from '@angular/core';
import { ICartItem } from '../../../model';
import { NzButtonComponent } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-cart-product-card',
  standalone: true,
  imports: [NzButtonComponent],
  templateUrl: './cart-product-card.component.html',
  styleUrl: './cart-product-card.component.css',
})
export class CartProductCardComponent {
  @Input({ required: true }) cartProduct!: ICartItem;
}
