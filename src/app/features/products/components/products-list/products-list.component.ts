import { Component, input, output } from '@angular/core';
import { Product } from '../../../../models/product-model';
import { ProductCardComponent } from '../product-card/product-card.component';
import { MenuIconComponent } from '../../../../components/icons/menu-icon/menu-icon.component';
import { FilterIconComponent } from '../../../../components/icons/filter-icon/filter-icon.component';
import {
  MenuToggleDirective,
  SideMenuDirective,
} from '../../../../directives/side-menu/side-menu.directive';
import { MenuSideComponent } from '../../../../components/menu-side/menu-side.component';
import { CloseIconComponent } from '../../../../components/icons/close-icon/close-icon/close-icon.component';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [
    ProductCardComponent,
    FilterIconComponent,
    MenuIconComponent,
    SideMenuDirective,
    MenuToggleDirective,
    MenuSideComponent,
    CloseIconComponent,
  ],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css',
})
export class ProductsListComponent {
  products = input.required<Product[]>();
  syncAll = input<void>();
  onSyncProductById = output<number>();
  onSyncAllProducts = output();

  onSyncProducts() {
    this.onSyncAllProducts.emit();
  }

  onSyncProduct(id: number) {
    this.onSyncProductById.emit(id);
  }
}
