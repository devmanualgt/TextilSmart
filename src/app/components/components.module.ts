import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { SearchComponent } from './table/search/search.component';
import { MaterialModule } from '../material.module';
import { TablerIconsModule } from 'angular-tabler-icons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from './loading/loader.component';
import { ModalHeaderComponent } from './modal-header/modal-header.component';
import { RouterModule } from '@angular/router';
import { MatSelectSearchComponent } from './mat-select-search/mat-select-search.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

@NgModule({
  declarations: [
    TableComponent,
    SearchComponent,
    LoaderComponent,
    ModalHeaderComponent,
    MatSelectSearchComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    TablerIconsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    NgxMatSelectSearchModule,
  ],
  exports: [
    TableComponent,
    SearchComponent,
    LoaderComponent,
    ModalHeaderComponent,
    MatSelectSearchComponent,
  ],
})
export class ComponentsModule {}
