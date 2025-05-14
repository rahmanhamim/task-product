import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProductViewComponent } from './components/home/product-view/product-view.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'product/:id', component: ProductViewComponent },
      { path: 'products/category/:category', component: HomeComponent },
    ],
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [{ path: 'login', component: LoginComponent }],
  },
];

/* 

This is search component i want functionallity here
export class ProductSearchComponent {
  form = new FormGroup({
    searchText: new FormControl('', {
      validators: [Validators.required],
    }),
  });

  onSubmit() {
    const enteredSearchText = this.form.value.searchText;
    if (!enteredSearchText?.trim()) return;
    console.log(enteredSearchText);
  }
}

this is home.. showing product all products and also by category here.
export class HomeComponent implements OnInit, OnDestroy {
  products: IProduct[] = [];
  limit = 5;
  skip = 0;
  loading = true;
  category: string | null = null;

  private route = inject(ActivatedRoute);
  private productsService = inject(ProductsService);
  private routeSub?: Subscription;

  ngOnInit() {
    this.routeSub = this.route.paramMap.subscribe((params: ParamMap) => {
      this.category = params.get('category');
      this.products = [];
      this.skip = 0;
      this.loadProducts();
    });
  }

  loadProducts() {
    this.loading = true;
    this.productsService
      .fetchProducts({
        limit: this.limit,
        skip: this.skip,
        category: this.category ?? undefined,
      })
      .subscribe((res) => {
        this.products = [...this.products, ...res.products];
        this.skip += this.limit;
        this.loading = false;
      });
  }

  ngOnDestroy() {
    this.routeSub?.unsubscribe();
  }
}

this is service
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private httpClient = inject(HttpClient);

  private productCategoriesState: IProductCategory[] = [];
  get productCategories(): ReadonlyArray<IProductCategory> {
    return this.productCategoriesState;
  }

  fetchProductCategories() {
    return this.httpClient.get<IProductCategory[]>(
      `${BASE_URL}/products/categories`,
      {}
    );
  }

  fetchProducts({
    limit,
    skip,
    category,
  }: {
    limit: number;
    skip: number;
    category?: string;
  }) {
    const url = category
      ? `${BASE_URL}/products/category/${category}?limit=${limit}&skip=${skip}`
      : `${BASE_URL}/products?limit=${limit}&skip=${skip}`;
    return this.httpClient.get<{ products: IProduct[] }>(url);
  }

  fetchProductById(id: number) {
    return this.httpClient.get<IProduct>(`${BASE_URL}/products/${id}`);
  }
}

this is routes
{
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'product/:id', component: ProductViewComponent },
      { path: 'products/category/:category', component: HomeComponent },
    ],
  },

i want something like this ?search=sometext
other filter will add later here like sort and limit

how to do it? search functionality

*/
