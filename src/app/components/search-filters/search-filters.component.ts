import { Component } from '@angular/core';
import { ProductSearchComponent } from './product-search/product-search.component';

@Component({
  selector: 'app-search-filters',
  standalone: true,
  imports: [ProductSearchComponent],
  templateUrl: './search-filters.component.html',
  styleUrl: './search-filters.component.css',
})
export class SearchFiltersComponent {}
