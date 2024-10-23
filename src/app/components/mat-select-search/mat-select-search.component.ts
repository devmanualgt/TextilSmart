import { Component, forwardRef, Input, OnDestroy, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { ReplaySubject, Subject, takeUntil } from 'rxjs';
@Component({
  selector: 'app-mat-select-search',
  templateUrl: './mat-select-search.component.html',
  styleUrls: ['./mat-select-search.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MatSelectSearchComponent),
      multi: true,
    },
  ],
})
export class MatSelectSearchComponent implements OnInit, ControlValueAccessor {
  @Input() options: any[] = [];
  @Input() displayKey: string = 'name';
  @Input() info: any;

  public searchControl: FormControl = new FormControl();
  public selectControl: FormControl = new FormControl();
  public filteredOptions: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);

  private _onDestroy = new Subject<void>();

  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  ngOnInit() {
    this.filteredOptions.next(this.options.slice());

    this.searchControl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterOptions();
      });

    // Emitir cambios cuando el valor del select cambie
    this.selectControl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe((selectedValue) => {
        this.onChange(selectedValue); // Llamar a onChange con el valor seleccionado
        this.onTouched(); // Marcar como tocado
      });
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  // Métodos del ControlValueAccessor
  writeValue(value: any): void {
    this.selectControl.setValue(value, { emitEvent: false });
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.selectControl.disable();
    } else {
      this.selectControl.enable();
    }
  }

  private filterOptions() {
    let search = this.searchControl.value;
    if (!search) {
      this.filteredOptions.next(this.options.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredOptions.next(
      this.options.filter(
        (option) => option[this.displayKey].toLowerCase().indexOf(search) > -1
      )
    );
  }
}
