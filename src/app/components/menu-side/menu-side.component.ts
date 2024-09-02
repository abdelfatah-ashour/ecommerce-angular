import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-menu-side',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './menu-side.component.html',
  styleUrl: './menu-side.component.css'
})
export class MenuSideComponent {

}
