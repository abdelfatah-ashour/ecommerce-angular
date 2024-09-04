import { Component, inject, input, output } from '@angular/core';
import { Product } from '../../../../models/product-model';
import { NgOptimizedImage } from '@angular/common';
import { PricePipe } from '../../../../pipes/price/price.pipe';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [NgOptimizedImage, PricePipe, RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  product = input.required<Product>();
  onSyncById = output<number>();
  private router = inject(Router);

  onCardClick() {
    this.router.navigate(['/products', this.product().id]).catch(() => {
      alert('Something went wrong!.');
    });
  }

  onSyncItemById(e: MouseEvent, id: number) {
    e.stopPropagation();
    this.onSyncById.emit(id);
  }
}
