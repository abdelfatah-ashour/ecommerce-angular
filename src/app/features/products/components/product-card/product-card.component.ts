import {Component, input, OnInit} from '@angular/core';
import {Product} from "../../../../models/product-model";
import {NgOptimizedImage} from "@angular/common";
import {PricePipe} from "../../../../pipes/price/price.pipe";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [
    NgOptimizedImage,
    PricePipe,
    RouterLink
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent implements OnInit {
  product = input.required<Product>()

  ngOnInit() {
    console.log(this.product())
  }
}
