import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NzSelectModule } from 'ng-zorro-antd/select';

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

  form = new FormGroup({
    show: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const show = params['show'];
      if (show) {
        this.form.get('show')?.setValue(show);
      }
    });
  }

  onShowChange(value: string): void {
    this.router.navigate([], {
      queryParams: { limit: value },
      queryParamsHandling: 'merge',
    });
  }
}
