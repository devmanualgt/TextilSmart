import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {

  @Input() filterProducts: (value: string) => void;

  onSearch(value: string) {
    if (this.filterProducts) {
      this.filterProducts(value); // Llama a la función pasada desde el padre
    }
  }
  
}
