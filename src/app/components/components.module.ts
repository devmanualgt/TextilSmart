import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { SearchComponent } from './table/search/search.component';
import { MaterialModule } from '../material.module';
import { TablerIconsModule } from 'angular-tabler-icons';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [TableComponent, SearchComponent],
  imports: [CommonModule, MaterialModule, TablerIconsModule, FormsModule],
  exports: [TableComponent, SearchComponent],
})
export class ComponentsModule {}
