import { Component } from '@angular/core';
import { FloatLabelType } from '@angular/material/form-field';
import { ComponentsModule } from 'src/app/components/components.module';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-add-feedstock',
  standalone: true,
  imports: [ComponentsModule, MaterialModule],
  templateUrl: './add-feedstock.component.html',
  styleUrl: './add-feedstock.component.scss',
})
export class AddFeedstockComponent {
  float: FloatLabelType = 'auto';

  constructor() {}
}
