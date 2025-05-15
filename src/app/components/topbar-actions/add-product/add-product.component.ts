import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputGroupComponent, NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [NzButtonModule, NzModalModule, ReactiveFormsModule, NzInputModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
})
export class AddProductComponent {
  isVisible = false;
  isConfirmLoading = false;

  showModal(): void {
    this.isVisible = true;
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
    console.log(this.form.value);
  }
}
