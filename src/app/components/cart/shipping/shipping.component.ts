import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-shipping',
  standalone: true,
  imports: [
    CurrencyPipe,
    ReactiveFormsModule,
    NzInputModule,
    NzButtonComponent,
    AsyncPipe,
  ],
  templateUrl: './shipping.component.html',
  styleUrl: './shipping.component.css',
})
export class ShippingComponent {
  cartService = inject(CartService);

  totalAmount = this.cartService.totalPrice$;

  form = new FormGroup({
    name: new FormControl('', {
      validators: [Validators.required],
    }),
    address: new FormControl('', {
      validators: [Validators.required],
    }),
  });

  get nameIsInvalid() {
    return (
      this.form.controls.name.touched &&
      this.form.controls.name.dirty &&
      this.form.controls.name.invalid
    );
  }

  get addressIsInvalid() {
    return (
      this.form.controls.address.touched &&
      this.form.controls.address.dirty &&
      this.form.controls.address.invalid
    );
  }

  onSubmit() {
    console.log(this.form);
    const enteredName = this.form.value.name;
    const enteredAddress = this.form.value.address;
    console.log(enteredName, enteredAddress);
  }
}
