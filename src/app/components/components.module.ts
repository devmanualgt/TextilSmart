import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { SearchComponent } from './table/search/search.component';
import { MaterialModule } from '../material.module';
import { TablerIconsModule } from 'angular-tabler-icons';
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from './loading/loader.component';
import { ModalHeaderComponent } from './modal-header/modal-header.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    TableComponent,
    SearchComponent,
    LoaderComponent,
    ModalHeaderComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    TablerIconsModule,
    FormsModule,
  ],
  exports: [
    TableComponent,
    SearchComponent,
    LoaderComponent,
    ModalHeaderComponent,
  ],
})
export class ComponentsModule {}
