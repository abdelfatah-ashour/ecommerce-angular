import {Component, signal} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {Product} from "../../../../models/product-model";
import {RouterLink} from "@angular/router";
import {PricePipe} from "../../../../pipes/price/price.pipe";

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterLink,
    PricePipe
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
    product = signal<Product|null>({
      "id": 1,
      "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
      "price": 109.95,
      "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
      "category": "men's clothing",
      "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      "rating": {
        "rate": 3.9,
        "count": 120
      }
    })
}
