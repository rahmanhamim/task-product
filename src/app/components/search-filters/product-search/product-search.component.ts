import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-product-search',
  imports: [
    FormsModule,
    NzButtonModule,
    NzInputModule,
    NzIconModule,
    ReactiveFormsModule,
  ],
  templateUrl: './product-search.component.html',
  styleUrl: './product-search.component.css',
})
export class ProductSearchComponent {
  form = new FormGroup({
    searchText: new FormControl('', {
      validators: [Validators.required],
    }),
  });

  private router = inject(Router);

  onSubmit() {
    const searchText = this.form.value.searchText?.trim();
    if (!searchText) return;

    // Navigate to the home route with search query parameter
    this.router.navigate(['/'], { queryParams: { search: searchText } });
  }
}
