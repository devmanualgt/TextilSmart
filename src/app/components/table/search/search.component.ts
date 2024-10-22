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
  @Output() newValue = new EventEmitter();

  onSearch(event: any): void {
    const value = event.target.value;
    this.searchValue.emit(value);
  }

  onNew(): void {
    this.newValue.emit('click');
  }
}
