import { AlertService } from './../../../services/alert.service';
import { Component, OnInit } from '@angular/core';
import { NgbAccordionModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddUsersComponent } from '../add-users/add-users.component';
import Swal from 'sweetalert2';
import { ComponentsModule } from 'src/app/components/components.module';
import { MaterialModule } from 'src/app/material.module';
import { TablerIconsModule } from 'angular-tabler-icons';
import { UserService } from '../services/user.service';
import { CRUD } from 'src/app/models/tbl-information.model';

@Component({
  selector: 'app-list-users',
  standalone: true,
  imports: [NgbAccordionModule,ComponentsModule],
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.scss',
})
export class ListUsersComponent implements OnInit{
  users: any = []
  constructor(
    private userService: UserService,
    private modalService: NgbModal,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.getUsers()
  }

  async getUsers(){
    const listUsers = await this.userService.find()
    if(listUsers.status){
      this.users= listUsers.data
      console.log(listUsers.data)
    }
  }

  openModal(user?: any) {
    //console.log('Usuario a modificar:', user);  // Verificar qué datos se están pasando
    
    const modalRef = this.modalService.open(AddUsersComponent, {
      centered: true,
      keyboard: false,
      size: 'lg',
    });
  
    modalRef.componentInstance.info = {
      data: user,
      type: user ?  CRUD.UPDATE : CRUD.CREATE,  // Define que es una operación de actualización
    };
  
    modalRef.result.then(
      (result) => {
        if (result.refresh) {
          console.log('Refreshing users list'); // Verifica que esta línea se ejecute
          this.getUsers(); // Volver a cargar la lista de usuarios después de actualizar
        }
      },
      (reason) => {
        console.log('Modal cerrado sin guardar cambios');
      }
    );
  }
  

  async deleteUser(userid: string) {
    const alertDeleted = await this.alertService.alertSimple(
      'Confirmación de Eliminación',
      '¿Está seguro de que desea eliminar este usuario? Esta acción es irreversible y el usuario no podrá ser recuperado.',
      'warning',
      'Sí, eliminar',
      'Cancelar',
      false
    );

    if (!alertDeleted) {
      return;
    }
    this.alertService.loader('Eliminando', '', 0);
    const deleted = await this.userService.delete(userid);
    
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
          this.getUsers();
        });
    }
  }
  search(value: string) {
    console.log(value);
  }
}
