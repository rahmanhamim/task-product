import { Component } from '@angular/core';
import { ProductSearchComponent } from './product-search/product-search.component';
import { FiltersComponent } from "./filters/filters.component";

@Component({
  selector: 'app-search-filters',
  standalone: true,
  imports: [ProductSearchComponent, FiltersComponent],
  templateUrl: './search-filters.component.html',
  styleUrl: './search-filters.component.css',
})
export class SearchFiltersComponent {}
