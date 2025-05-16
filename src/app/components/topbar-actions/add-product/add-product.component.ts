import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { ProductsService } from '../../../services/products.service';
import { IProduct } from '../../../model';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [NzButtonModule, NzModalModule, ReactiveFormsModule, NzInputModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
})
export class AddProductComponent {
  private productService = inject(ProductsService);
  private router = inject(Router);
  private authService = inject(AuthService);

  isLoggedIn$ = this.authService.isLoggedIn();

  isVisible = false;
  isConfirmLoading = false;

  showModal(): void {
    this.isLoggedIn$.subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        this.isVisible = true;
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  handleOk(): void {
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 1000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  form = new FormGroup({
    title: new FormControl('', { validators: [Validators.required] }),
    price: new FormControl('', {
      validators: [Validators.required, Validators.min(0)],
    }),
    description: new FormControl('', {
      validators: [Validators.required],
    }),
    thumbnail: new FormControl('', { validators: [Validators.required] }),
  });

  onSubmit() {
    const newProduct: Partial<IProduct> = {
      id: Math.floor(Math.random() * 100),
      title: this.form.value.title || '',
      price: this.form.value.price ? Number(this.form.value.price) : 0,
      description: this.form.value.description || '',
      thumbnail: this.form.value.thumbnail || '',
    };

    this.productService.onAddProduct(newProduct as IProduct);

    // Reset the form
    this.form.reset();
  }
}
