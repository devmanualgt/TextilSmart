import { AlertService } from './../../../services/alert.service';
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddUsersComponent } from '../add-users/add-users.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-users',
  standalone: true,
  imports: [],
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
      '',
      '¿Está seguro de eliminar el usuario?',
      'question',
      'Aceptar',
      'Cancelar',
      false
    );
    if (alertDeleted) {
      console.log('usar api para eliminar');
    }
  }
}
