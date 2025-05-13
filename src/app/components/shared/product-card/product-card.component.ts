import { Component, Input, input } from '@angular/core';
import { IProduct } from '../../../model';
import { NzButtonComponent } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [NzButtonComponent],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  @Input({ required: true }) product!: IProduct;
}
