import { Component, inject, OnInit, signal } from '@angular/core';
import { LayoutComponent } from '../../../../components/layout/layout.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MenuSideComponent } from '../../../../components/menu-side/menu-side.component';
import { ProductsListComponent } from '../products-list/products-list.component';
import { Product } from '../../../../models/product-model';
import { GetProductsService } from '../../services/get-products/get-products.service';
import { ParamParserService } from '../../../../services/param-parser/param-parser.service';
import { map, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    LayoutComponent,
    RouterLink,
    MenuSideComponent,
    ProductsListComponent,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  getProducts = inject(GetProductsService);
  params = inject(ParamParserService);
  activatedRoute = inject(ActivatedRoute);
  products = signal<Product[]>([]);

  ngOnInit() {
    this.params.getQueryParams().subscribe((queries) => {
      if (queries['category']) {
        this.getProducts
          .getProductsByCategory(queries['category'])
          .subscribe((res) => {
            this.products.set(res);
          });
      } else {
        this.getProducts.getAllProducts().subscribe((res) => {
          this.products.set(res);
        });
      }
    });
  }

  onSyncAllProducts() {
    this.params.getQueryParams().subscribe((queries) => {
      const route = queries['category']
        ? `/products/category/${queries['category']}`
        : '/products';

      this.getProducts.syncAllProducts(route).subscribe((res) => {
        this.products.set(res);
      });
    });
  }

  onSyncItemById(id: number) {
    this.params
      .getQueryParams()
      .pipe(
        map((queries) =>
          queries['category']
            ? `/products/category/${queries['category']}`
            : '/products',
        ),
        switchMap((route) => this.getProducts.syncProductsById(route, id)),
        tap((res) => {
          this.products.set(res);
        }),
      )
      .subscribe();

    // Handle queryParams from ActivatedRoute
    this.activatedRoute.queryParams
      .pipe(
        map((params) =>
          params['category']
            ? `/products/category/${params['category']}`
            : '/products',
        ),
        tap((query) => {
          console.log('query', query);
        }),
      )
      .subscribe();
  }
}
