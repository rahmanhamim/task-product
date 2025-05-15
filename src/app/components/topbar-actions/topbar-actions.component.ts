import { Component } from '@angular/core';
import { ProductSearchComponent } from './product-search/product-search.component';
import { FiltersComponent } from './filters/filters.component';
import { AddProductComponent } from './add-product/add-product.component';

@Component({
  selector: 'app-topbar-actions',
  standalone: true,
  imports: [ProductSearchComponent, FiltersComponent, AddProductComponent],
  templateUrl: './topbar-actions.component.html',
  styleUrl: './topbar-actions.component.css',
})
export class TopbarActionsComponent {}
