import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ProductsService } from '../../../services/products.service';
import { IProductCategory } from '../../../model';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [NzSelectModule, ReactiveFormsModule],
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
})
export class FiltersComponent implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private productService = inject(ProductsService);
  private destroyRef = inject(DestroyRef);

  productCategories: IProductCategory[] = [];

  form = new FormGroup({
    show: new FormControl('', [Validators.required]),
  });

  categoryForm = new FormGroup({
    category: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    // Subscribe to route query parameters for 'show'
    const showSubscription = this.route.queryParams.subscribe((params) => {
      const show = params['show'];
      if (show) {
        this.form.get('show')?.setValue(show);
      }
    });

    // Subscribe to route parameters for 'category'
    const categorySubscription = this.route.params.subscribe((params) => {
      const category = params['category'];
      if (category) {
        this.categoryForm.get('category')?.setValue(category);
      }
    });

    // Fetch product categories
    const subscription = this.productService
      .fetchProductCategories()
      .subscribe((response) => {
        this.productCategories = response;
      });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
      categorySubscription.unsubscribe();
      showSubscription.unsubscribe();
    });
  }

  onShowChange(value: string): void {
    this.router.navigate([], {
      queryParams: { limit: value },
      queryParamsHandling: 'merge',
    });
  }

  onCategoryChange(value: string): void {
    this.router.navigate([`/products/category/${value}`]);
  }
}
