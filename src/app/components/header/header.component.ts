import { Component } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-header',
  imports: [NzButtonModule, CartComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {}
