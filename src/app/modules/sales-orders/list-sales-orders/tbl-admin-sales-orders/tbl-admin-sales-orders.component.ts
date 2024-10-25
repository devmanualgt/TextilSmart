import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TablerIconsModule } from 'angular-tabler-icons';
import { ComponentsModule } from 'src/app/components/components.module';
import { MaterialModule } from 'src/app/material.module';
import {
  CRUD,
  FnData,
  TblInformation,
} from 'src/app/models/tbl-information.model';
import { AlertService } from 'src/app/services/alert.service';
import { tbl_orders } from '../../models/tbl-orders';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-tbl-admin-sales-orders',
  standalone: true,
  imports: [ComponentsModule, MaterialModule, TablerIconsModule],
  templateUrl: './tbl-admin-sales-orders.component.html',
  styleUrl: './tbl-admin-sales-orders.component.scss',
})
export class TblAdminSalesOrdersComponent implements OnInit {
  tlbInfo: TblInformation;
  tblData: any;
  originalTblData: any;
  constructor(
    private ordersService: OrdersService,
    private router: Router,
    private modalService: NgbModal,
    private alertService: AlertService
  ) {}
  ngOnInit(): void {
    this.getListProduction();
  }

  async getListProduction() {
    this.tlbInfo = {
      tbl_name: 'Lista de Producciones',
      export_xls: false,
      scroll_tbl: false,
      headers: tbl_orders.headers,
      rows: tbl_orders.rows,
      btns: tbl_orders.btn,
    };
    const getList = await this.ordersService.find();
    if (getList.status) {
      this.tblData = getList.data;
      this.originalTblData = [...this.tblData];
    }
  }

  actions(event: FnData) {
    if ([CRUD.READ].includes(event.type)) {
      this.router.navigate([`sales/orders/detail/${event.data.id}`]);
    } else if ([CRUD.ACCTION].includes(event.type)) {
      this.nextPass(event);
    }
  }

  async nextPass(info?: FnData) {
    const alertDeleted = await this.alertService.alertSimple(
      'Confirmación',
      `¿Desea que el pedido pase a el estado ${info?.data.siguienteEstado}`,
      'warning',
      'Sí',
      'Cancelar',
      false
    );
    if (!alertDeleted) {
      return;
    }
    const data = {
      ordenId: info?.data.id,
      nuevoEstado: info?.data.siguienteEstado,
    };
    this.alertService.loader('Guardando', 'Grabando siguiente etapa', 0);
    const next = await this.ordersService.newState(data);
    if (next.status) {
      this.alertService
        .alertSimple(
          'Notificación',
          'Estado guardado',
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
    const deleted = await this.ordersService.delete(id);
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
      this.tblData = this.ordersService.filterDataTable(
        this.originalTblData,
        searchText
      );
    }
  }
}
