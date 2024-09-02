import {Component, input} from '@angular/core';
import {Product} from "../../../../models/product-model";
import {ProductCardComponent} from "../product-card/product-card.component";
import {MenuIconComponent} from "../../../../components/icons/menu-icon/menu-icon.component";
import {FilterIconComponent} from "../../../../components/icons/filter-icon/filter-icon.component";

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [
    ProductCardComponent,
    MenuIconComponent,
    FilterIconComponent
  ],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css'
})
export class ProductsListComponent {
    products = input.required<Product[]>()
}
