import { Component, inject, OnInit, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Product } from '../../../../models/product-model';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PricePipe } from '../../../../pipes/price/price.pipe';
import { GetProductService } from '../../services/get-product/get-product.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [NgOptimizedImage, RouterLink, PricePipe],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  product = signal<Product | null>(null);
  params = inject(ActivatedRoute);
  getProduct = inject(GetProductService);

  ngOnInit() {
    this.params.paramMap.subscribe((param) => {
      if (param.get('id')) {
        this.getProduct.getProductsById(param.get('id')!).subscribe((res) => {
          this.product.set(res);
        });
      }
    });
  }
}
