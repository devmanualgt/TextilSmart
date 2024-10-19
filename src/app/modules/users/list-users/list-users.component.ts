import { AlertService } from './../../../services/alert.service';
import { Component } from '@angular/core';
import { NgbAccordionModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddUsersComponent } from '../add-users/add-users.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-users',
  standalone: true,
  imports: [NgbAccordionModule],
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.scss',
})
export class ListUsersComponent {
  constructor(
    private modalService: NgbModal,
    private alertService: AlertService
  ) {}

  openModal() {
    const modalRef = this.modalService.open(AddUsersComponent, {
      centered: true,
      keyboard: false,
    });
  }

  async deleteUser() {
    const alertDeleted = await this.alertService.alertSimple(
      'Confirmación de Eliminación',
      '¿Está seguro de que desea eliminar este usuario? Esta acción es irreversible y el usuario no podrá ser recuperado.',
      'warning',
      'Sí, eliminar',
      'Cancelar',
      false
    );

    if (alertDeleted) {
      console.log('usar API para eliminar');
    }
  }
}
