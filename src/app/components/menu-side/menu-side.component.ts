import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { GetCategoriesService } from '../../features/products/services/get-categories/get-categories.service';

@Component({
  selector: 'app-menu-side',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './menu-side.component.html',
  styleUrl: './menu-side.component.css',
})
export class MenuSideComponent implements OnInit {
  getCategoriesService = inject(GetCategoriesService);
  categories = signal<string[]>([]);

  ngOnInit(): void {
    this.getCategoriesService.getAllCategories().subscribe((res) => {
      this.categories.set(res);
    });
  }
}
