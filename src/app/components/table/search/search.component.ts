import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  @Input() textBtn: string;
  @Output() searchValue = new EventEmitter();

  onSearch(event: any): void {
    const value = event.target.value;
    this.searchValue.emit(value);
    // Aquí puedes realizar acciones como filtrar una lista
  }
}
