import { AlertService } from './../../../services/alert.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FeedstockService } from './../services/feedstock.service';
import { Component, OnInit } from '@angular/core';
import { FloatLabelType } from '@angular/material/form-field';
import { ComponentsModule } from 'src/app/components/components.module';
import { MaterialModule } from 'src/app/material.module';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-feedstock',
  standalone: true,
  imports: [ComponentsModule, MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-feedstock.component.html',
  styleUrl: './add-feedstock.component.scss',
})
export class AddFeedstockComponent implements OnInit {
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
    this.feedStockForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      unidadMedida: ['', Validators.required],
      nivelMinimo: ['', Validators.required],
      precioUnitario: ['', Validators.required],
      proveedor: ['', Validators.required],
      categoriaMateria: ['', Validators.required],
    });
    this.getProviders();
    this.getCategories();
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
    const send = await this.feedstockService.postFeedStock(
      this.feedStockForm.value
    );
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
    console.log(this.feedStockForm.value);
  }
}
