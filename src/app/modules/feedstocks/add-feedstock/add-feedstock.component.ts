import { AlertService } from './../../../services/alert.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FeedstockService } from './../services/feedstock.service';
import { Component, Input, OnInit } from '@angular/core';
import { FloatLabelType } from '@angular/material/form-field';
import { ComponentsModule } from 'src/app/components/components.module';
import { MaterialModule } from 'src/app/material.module';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CRUD, FnData } from 'src/app/models/tbl-information.model';

@Component({
  selector: 'app-add-feedstock',
  standalone: true,
  imports: [ComponentsModule, MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-feedstock.component.html',
  styleUrl: './add-feedstock.component.scss',
})
export class AddFeedstockComponent implements OnInit {
  @Input() info: FnData;
  float: FloatLabelType = 'auto';
  feedStockForm: FormGroup;
  providers = [];
  categories = [];
  constructor(
    private fb: FormBuilder,
    public activeModal: NgbActiveModal,
    private feedstockService: FeedstockService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.generateForm();
  }

  cerrarModal(refresh: boolean): void {
    const closeInfo = { origin: 'feedstock', refresh };
    this.activeModal.close(closeInfo);
  }

  async getProviders() {
    const listProviders = await this.feedstockService.getProviders();
    if (listProviders.status) {
      this.providers = listProviders.data;
    }
  }

  async getCategories() {
    const listCategories = await this.feedstockService.getCategories();
    if (listCategories.status) {
      this.categories = listCategories.data;
    }
  }

  generateForm() {
    const disabled = [CRUD.READ].includes(this.info?.type) ? true : false;
    this.feedStockForm = this.fb.group({
      nombre: [{ value: '', disabled: disabled }, Validators.required],
      descripcion: [{ value: '', disabled: disabled }, Validators.required],
      unidadMedida: [{ value: '', disabled: disabled }, Validators.required],
      nivelMinimo: [{ value: '', disabled: disabled }, Validators.required],
      precioUnitario: [{ value: '', disabled: disabled }, Validators.required],
      proveedor: [{ value: '', disabled: disabled }, Validators.required],
      categoriaMateria: [
        { value: '', disabled: disabled },
        Validators.required,
      ],
    });
    this.getProviders();
    this.getCategories();

    if (this.info) {
      this.setFormValues();
    }
  }

  async sendFeedSock() {
    if (this.feedStockForm.invalid) {
      return;
    }

    await this.alertService.loader(
      'Guardando...',
      'Materia Prima se esta guardado',
      0
    );
    let send;
    if (this.info?.type === CRUD.UPDATE) {
      send = await this.feedstockService.update(
        this.feedStockForm.value,
        this.info.data['id']
      );
    } else {
      send = await this.feedstockService.create(this.feedStockForm.value);
    }

    if (send.status) {
      this.alertService
        .alertSimple(
          'Notificación',
          send.message,
          'success',
          'Aceptar',
          '',
          true
        )
        .then(async (es) => {
          this.cerrarModal(true);
        });
    }
  }

  setFormValues() {
    const data = this.info.data;
    this.feedStockForm.patchValue({
      nombre: data.nombre,
      descripcion: data.descripcion,
      unidadMedida: data.unidadMedida,
      nivelMinimo: data.nivelMinimo,
      precioUnitario: data.precioUnitario,
      proveedor: data?.proveedor?.id,
      categoriaMateria: data?.categoriaMateria?.id,
    });
  }
}
