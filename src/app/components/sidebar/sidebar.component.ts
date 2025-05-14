import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { IProductCategory } from '../../model';
import { ProductsService } from '../../services/products.service';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NzButtonComponent, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {
  private productService = inject(ProductsService);
  private destroyRef = inject(DestroyRef);

  productCategories: IProductCategory[] = [];

  ngOnInit() {
    const subscription = this.productService
      .fetchProductCategories()
      .subscribe((response) => {
        this.productCategories = response;
      });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
