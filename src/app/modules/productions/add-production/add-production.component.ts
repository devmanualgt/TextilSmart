import { CommonModule } from '@angular/common';
import { Component, inject, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  NgLabelTemplateDirective,
  NgOptionTemplateDirective,
  NgSelectComponent,
} from '@ng-select/ng-select';
import { AlertService } from 'src/app/services/alert.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-production',
  standalone: true,
  imports: [
    CommonModule,
    NgSelectComponent,
    NgLabelTemplateDirective,
    NgOptionTemplateDirective,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './add-production.component.html',
  styleUrl: './add-production.component.scss',
})
export class AddProductionComponent implements OnInit {
  private _formBuilder = inject(FormBuilder);
  selectedCar: number;

  productionForm: FormGroup;

  constructor(
    private alertService: AlertService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    console.log("Inicio del componenete")
    this.generarFormularioProduccion()
  }

  generarFormularioProduccion(){
    this.productionForm = this.fb.group({
      proveedor: [null, Validators.required],
      producto: [null, Validators.required],
      color: [null, Validators.required],
      talla: [null, Validators.required],
      cantidad: [0, Validators.required],
      encargado: [null, Validators.required],
      fechaFin: ["", Validators.required],
      fechaInicio: ["", Validators.required]
    })
  }
  
  async sendproduction() {
    if (this.productionForm.invalid){
      return
    }

    const nombreProducto= this.buscarElemento(this.cars, this.productionForm.value.producto)["name"]
    const nombreEncargado= this.buscarElemento(this.cars2, this.productionForm.value.encargado)["name"]
    const nombreProveedor= this.buscarElemento(this.cars3, this.productionForm.value.proveedor)["name"]
    const colores= this.buscarElemento(this.cars4, this.productionForm.value.color)["name"]
    const tallas= this.buscarElemento(this.cars5, this.productionForm.value.talla)["name"]
    const AlertService = await this.alertService.alertSimple(
      'Confirmación de Envío',
      //'¿Está seguro de que desea enviar la solicitud con los datos actuales?',
      `<p> Proveedor: ${nombreProveedor} </p> <p> Producto: ${nombreProducto} </p> <p> Color: ${colores} </p>  
      <p> Talla: ${tallas} </p> <p>Encargado: ${nombreEncargado}</p> <p> Cantidad a Fabricar: ${this.productionForm.value.cantidad} </p>
      <p> Fecha Inicio: ${this.productionForm.value.fechaInicio} </p> <p> Fecha Fin: ${this.productionForm.value.fechaFin} </p>`,
      'warning',
      'Sí, enviar',
      'Cancelar',
      false
    );

    if (AlertService) {
      console.log('usar API para enviar');
    }
  }
  
  buscarElemento(listado: any[], valor: string){
    return listado.find(item => item['id'] = valor)
  }

  cars = [
    { id: 1, name: 'Camisa' },
    { id: 2, name: 'Blusa' },
    { id: 3, name: 'Short' },
    { id: 4, name: 'Top' },
  ];

  cars2 = [
    { id: 1, name: 'Encargado1' },
    { id: 2, name: 'Encargado2' },
    { id: 3, name: 'Encargado3' },
    { id: 4, name: 'Encargado4' },
  ];

  cars3 = [
    { id: 1, name: 'Gusy' },
    { id: 2, name: 'Tres Mosqueteros' },
    { id: 3, name: 'Uniformes Industriales' },
    { id: 4, name: 'RG Uniformes' },
  ];

  cars4 = [
    { id: 1, name: 'Rojo' },
    { id: 2, name: 'Amarrilo' },
    { id: 3, name: 'Verde' },
    { id: 4, name: 'Blanco' },
  ];

  cars5 = [
    { id: 1, name: 'XS' },
    { id: 2, name: 'S' },
    { id: 3, name: 'M' },
    { id: 4, name: 'L' },
  ];
}
