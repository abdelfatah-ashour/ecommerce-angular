import { Component, inject, OnInit, signal } from '@angular/core';
import { LayoutComponent } from '../../../../components/layout/layout.component';
import { RouterLink } from '@angular/router';
import { MenuSideComponent } from '../../../../components/menu-side/menu-side.component';
import { ProductsListComponent } from '../products-list/products-list.component';
import { Product } from '../../../../models/product-model';
import { GetProductsService } from '../../services/get-products/get-products.service';
import { ParamParserService } from '../../../../services/param-parser/param-parser.service';

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
  products = signal<Product[]>([]);
  params = inject(ParamParserService);

  ngOnInit() {
    this.getProducts.getAllProducts().subscribe((res) => {
      this.products.set(res);
    });

    this.params.getQueryParams().subscribe((queries) => {
      if (queries['category']) {
        this.getProducts
          .getProductsByCategory(queries['category'])
          .subscribe((res) => {
            this.products.set(res);
          });
      }
    });
  }
}
