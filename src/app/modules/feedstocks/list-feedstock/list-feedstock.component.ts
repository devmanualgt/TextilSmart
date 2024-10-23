import { Component, OnInit } from '@angular/core';
import { ComponentsModule } from 'src/app/components/components.module';
import { FeedstockService } from '../services/feedstock.service';
import {
  CRUD,
  FnData,
  TblInformation,
} from 'src/app/models/tbl-information.model';
import { tbl_feedstock } from '../models/tbl-feedstock';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddFeedstockComponent } from '../add-feedstock/add-feedstock.component';
import { MaterialModule } from 'src/app/material.module';
import { TablerIconsModule } from 'angular-tabler-icons';
import { AlertService } from 'src/app/services/alert.service';
import { NavigationExtras, Router } from '@angular/router';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-list-feedstock',
  standalone: true,
  imports: [ComponentsModule, MaterialModule, TablerIconsModule],
  templateUrl: './list-feedstock.component.html',
  styleUrl: './list-feedstock.component.scss',
})
export class ListFeedstockComponent implements OnInit {
  tlbInfo: TblInformation;
  tblData: any;
  originalTblData: any;
  constructor(
    private router: Router,
    private feedstockService: FeedstockService,
    private modalService: NgbModal,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.getFeedStock();
  }

  async getFeedStock() {
    this.tlbInfo = {
      tbl_name: 'Materia Prima',
      export_xls: false,
      scroll_tbl: false,
      headers: tbl_feedstock.headers,
      rows: tbl_feedstock.rows,
      btns: tbl_feedstock.btn,
    };
    const getList = await this.feedstockService.find();
    if (getList.status) {
      this.tblData = getList.data;
      this.originalTblData = [...this.tblData];
    }
  }

  actions(event: FnData) {
    if ([CRUD.DELETE].includes(event.type)) {
      this.deleteItem(event.data.id);
    } else if ([CRUD.CREATE, CRUD.UPDATE, CRUD.READ].includes(event.type)) {
      this.openModal(event);
    } else if ([CRUD.ACCTION].includes(event.type)) {
      const navigationExtras: NavigationExtras = {
        state: {
          data: event.data,
        },
      };
      console.log(navigationExtras);

      this.router.navigate([`purchase/orders/new`], navigationExtras);
    }
  }

  openModal(info?: FnData) {
    const modalRef = this.modalService.open(AddFeedstockComponent, {
      backdrop: 'static',
      size: 'lg',
      centered: true,
      keyboard: false,
    });
    modalRef.componentInstance.info = info;
    modalRef.result
      .then((result) => {
        if (result.refresh) {
          this.getFeedStock();
        }
      })
      .catch((reason) => {
        console.log('Modal cerrado con error:', reason);
      });
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
    const deleted = await this.feedstockService.delete(id);
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
          this.getFeedStock();
        });
    }
  }

  // search(value: string) {
  //   console.log(value);
  // }

  search(searchText: string): void {
    if (searchText === '') {
      // Si el texto de búsqueda está vacío, restaurar los datos originales
      this.tblData = [...this.originalTblData];
    } else {
      // Filtrar la tabla si hay texto en el campo de búsqueda
      this.tblData = this.feedstockService.filterDataTable(
        this.originalTblData,
        searchText
      );
    }
  }
}
