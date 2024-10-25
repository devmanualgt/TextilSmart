import { JsonPipe, UpperCasePipe } from '@angular/common';
import { Component, Input, NgModule, OnInit, Pipe } from '@angular/core';
import {
  NgbAccordionModule,
  NgbCollapseModule,
} from '@ng-bootstrap/ng-bootstrap';
import { ComponentsModule } from 'src/app/components/components.module';
import { MaterialModule } from 'src/app/material.module';
import { FnData } from 'src/app/models/tbl-information.model';

@Component({
  selector: 'app-detail-product-type',
  standalone: true,
  imports: [
    ComponentsModule,
    MaterialModule,
    JsonPipe,
    UpperCasePipe,
    NgbCollapseModule,
    NgbAccordionModule,
  ],
  templateUrl: './detail-product-type.component.html',
  styleUrl: './detail-product-type.component.scss',
})
export class DetailProductTypeComponent implements OnInit {
  @Input() info: FnData;
  isCollapsed: boolean[] = [];

  constructor() {}

  ngOnInit(): void {
    //this.info.data = [];
    this.isCollapsed = new Array(this.info.data.atributos.length).fill(true);
  }

  toggleCollapse(index: number) {
    this.isCollapsed[index] = !this.isCollapsed[index];
  }
}
