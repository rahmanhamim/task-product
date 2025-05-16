import {
  Component,
  inject,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IProduct } from '../../../model';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzInputModule } from 'ng-zorro-antd/input';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-product',
  imports: [NzButtonModule, NzModalModule, ReactiveFormsModule, NzInputModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css',
})
export class EditProductComponent implements OnInit, OnChanges {
  @Input({ required: true }) product!: IProduct;

  private router = inject(Router);
  private productService = inject(ProductsService);
  private authService = inject(AuthService);

  isLoggedIn$ = this.authService.isLoggedIn();

  isVisible = false;
  isConfirmLoading = false;

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

  ngOnInit(): void {
    this.setFormValues();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product'] && changes['product'].currentValue) {
      this.setFormValues();
    }
  }

  private setFormValues(): void {
    this.form.patchValue({
      title: this.product.title,
      price: this.product.price.toString(),
      description: this.product.description,
      thumbnail: this.product.thumbnail,
    });
  }

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
    }, 500);
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  onSubmit() {
    const updatedProduct: Partial<IProduct> = {
      id: this.product.id,
      title: this.form.value.title || '',
      price: this.form.value.price ? Number(this.form.value.price) : 0,
      description: this.form.value.description || '',
      thumbnail: this.form.value.thumbnail || '',
    };

    this.productService.onUpdateProduct(updatedProduct);
    this.form.reset();
  }
}
