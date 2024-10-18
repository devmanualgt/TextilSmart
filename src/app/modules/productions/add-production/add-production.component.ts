import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  NgLabelTemplateDirective,
  NgOptionTemplateDirective,
  NgSelectComponent,
} from '@ng-select/ng-select';

@Component({
  selector: 'app-add-production',
  standalone: true,
  imports: [
    NgSelectComponent,
    NgLabelTemplateDirective,
    NgOptionTemplateDirective,
    FormsModule,
  ],
  templateUrl: './add-production.component.html',
  styleUrl: './add-production.component.scss',
})
export class AddProductionComponent {
  selectedCar: number;

  cars = [
    { id: 1, name: 'Camisa' },
    { id: 2, name: 'Blusa' },
    { id: 3, name: 'Short' },
    { id: 4, name: 'Top' },
  ];

  cars2 = [
    { id: 1, name: 'Encargado1' },
    { id: 2, name: 'Encargado2' },
    { id: 3, name: 'Encargado3' },
    { id: 4, name: 'Encargado4' },
  ];
}
