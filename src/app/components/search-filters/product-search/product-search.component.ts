import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-product-search',
  imports: [FormsModule, NzButtonModule, NzInputModule, NzIconModule],
  templateUrl: './product-search.component.html',
  styleUrl: './product-search.component.css',
})
export class ProductSearchComponent {}
