import { AlertService } from './../../../services/alert.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { FloatLabelType } from '@angular/material/form-field';
import { ComponentsModule } from 'src/app/components/components.module';
import { MaterialModule } from 'src/app/material.module';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CRUD, FnData } from 'src/app/models/tbl-information.model';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-add-users',
  standalone: true,
  imports: [ComponentsModule, MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss'],
})
export class AddUsersComponent implements OnInit{
  @Input() info: FnData;
  float: FloatLabelType = 'auto';
  addusersform: FormGroup;
  //activeModal: any;
 
  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private alertService: AlertService,
    private userservice: UserService,
    public activeModal: NgbActiveModal // Asegúrate de inyectarlo aquí 
  ){ }

  ngOnInit(): void {
    this.generateForm();
    const nombreControl = this.addusersform.get('nombre');
    const apellidoControl = this.addusersform.get('apellido');
    // Suscribirse a los cambios en los campos de nombre y apellido
    if (nombreControl) {
      nombreControl.valueChanges.subscribe(() => {
        this.autocompletarUsuarioCorreo();
      });
    }
  
    if (apellidoControl) {
      apellidoControl.valueChanges.subscribe(() => {
        this.autocompletarUsuarioCorreo();
      });
    }
  }

  //closeModal(p0: boolean) {
    //this.modalService.dismissAll();
  //}

  closeModal(refresh: boolean): void {
    const closeInfo = { origin: 'users', refresh }; // Crea un objeto con información de cierre
    this.activeModal.close(closeInfo); // Cierra el modal y envía la información
  }

  generateForm() {
    const disabled = [CRUD.READ].includes(this.info?.type) ? true : false;
    
    this.addusersform = this.fb.group({
      nombre: [{ value: this.info?.data?.nombre || '', disabled: disabled }, Validators.required],
      apellido: [{ value: this.info?.data?.apellido || '', disabled: disabled }, Validators.required],
      usuario: [{ value: this.info?.data?.usuario || '', disabled: disabled }, Validators.required],
      correoElectronico: [{ value: this.info?.data?.correoElectronico || '', disabled: disabled }, [Validators.required, Validators.email]],
      telefono: [{ value: this.info?.data?.telefono || '', disabled: disabled }, Validators.required],
    });
  }
  // Método para autocompletar los campos de usuario y correo
  autocompletarUsuarioCorreo(): void {

    // Obtiene los valores actuales de los campos nombre y apellido
    const nombre = this.addusersform.get('nombre')?.value;
    const apellido = this.addusersform.get('apellido')?.value;
  
    // Verifica que ambos campos no estén vacíos
    if (nombre && apellido) {
      // Genera el usuario: primera letra del nombre + apellido completo
      const usuario = `${nombre.charAt(0).toLowerCase()}${apellido.toLowerCase()}`;
      // Genera el correo: usuario + @textilsmart.com
      const correo = `${usuario}@textilsmart.com`;
  
      // Autocompletar los campos de usuario y correo
      this.addusersform.get('usuario')?.setValue(usuario, { emitEvent: false });
      this.addusersform.get('correoElectronico')?.setValue(correo, { emitEvent: false });
    }
  }

  async sendUsersForm() {
    if (this.addusersform.invalid) {
      return;
    }
  
    await this.alertService.loader('Guardando...', 'El usuario se está guardando...', 0);
    let send;
    
    if (this.info?.type === CRUD.UPDATE) {
      console.log("update")
      // Actualización del usuario existente
      send = await this.userservice.update(this.addusersform.value, this.info.data['id']);
    } else {
      send = await this.userservice.create(this.addusersform.value);
    }
  
    if (send.status) {
      this.alertService.alertSimple('Notificación', send.message, 'success', 'Aceptar', '', true).then(async (es) => {
        this.closeModal(true);
      });
    }
  }
}
