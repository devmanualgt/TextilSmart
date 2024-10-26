import { Component, OnInit } from '@angular/core';
import {
  CRUD,
  FnData,
  TblInformation,
} from 'src/app/models/tbl-information.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from 'src/app/material.module';
import { TablerIconsModule } from 'angular-tabler-icons';
import { AlertService } from 'src/app/services/alert.service';
import { NavigationExtras, Router } from '@angular/router';
import { CrudService } from 'src/app/services/crud.service';
import { ProductionService } from '../services/production.service';
import { ComponentsModule } from 'src/app/components/components.module';
import { tbl_production } from '../models/tbl-productions';
import { AddProductionComponent } from '../add-production/add-production.component';

@Component({
  selector: 'app-list-productions',
  standalone: true,
  imports: [ComponentsModule, MaterialModule, TablerIconsModule],
  templateUrl: './list-productions.component.html',
  styleUrl: './list-productions.component.scss',
})
export class ListProductionsComponent implements OnInit {
  tlbInfo: TblInformation;
  tblData: any;
  originalTblData: any;
  constructor(
    private router: Router,
    private productionService: ProductionService,
    private modalService: NgbModal,
    private alertService: AlertService
  ) {}
  ngOnInit(): void {
    this.getListProduction();
    throw new Error('Method not implemented.');
  }

  async getListProduction() {
    this.tlbInfo = {
      tbl_name: 'Lista de Producciones',
      export_xls: false,
      scroll_tbl: false,
      headers: tbl_production.headers,
      rows: tbl_production.rows,
      btns: tbl_production.btn,
    };
    const getList = await this.productionService.find();
    if (getList.status) {
      this.tblData = getList.data;
      this.originalTblData = [...this.tblData];
    }
  }

  actions(event: FnData) {
    if ([CRUD.READ].includes(event.type)) {
      this.router.navigate([`productions/detail/${event.data.id}`]);
    } else if ([CRUD.ACCTION].includes(event.type)) {
      this.nextPass(event);
    }
  }

  async nextPass(info: FnData) {
    const alertDeleted = await this.alertService.alertSimple(
      'Confirmación de Paso Siguiente',
      '¿Desea pasar la producción a la siguiente etapa?',
      'warning',
      'Sí, Cambiar Paso',
      'Cancelar',
      false
    );
    if (!alertDeleted) {
      return;
    }
    const data = {
      procesoId: info.data.next.id,
      produccionId: info.data.id,
    };
    const next = await this.productionService.postNext(data);
    console.log(next);
  }

  async deleteItem(id: string) {
    const alertDeleted = await this.alertService.alertSimple(
      'Confirmación de Eliminación',
      '¿Está seguro de que desea eliminar el dato? Esta acción es irreversible y el usuario no podrá ser recuperado.',
      'warning',
      'Sí, eliminar',
      'Cancelar',
      false
    );

    if (!alertDeleted) {
      return;
    }
    this.alertService.loader('Eliminando', '', 0);
    const deleted = await this.productionService.delete(id);
    if (deleted.status) {
      this.alertService
        .alertSimple(
          'Notificación',
          deleted.message,
          'success',
          'Aceptar',
          '',
          true
        )
        .then(async (es) => {
          this.getListProduction();
        });
    }
  }

  openNew() {
    this.router.navigate([`productions/new`]);
  }

  search(searchText: string): void {
    if (searchText === '') {
      // Si el texto de búsqueda está vacío, restaurar los datos originales
      this.tblData = [...this.originalTblData];
    } else {
      // Filtrar la tabla si hay texto en el campo de búsqueda
      this.tblData = this.productionService.filterDataTable(
        this.originalTblData,
        searchText
      );
    }
  }
}
