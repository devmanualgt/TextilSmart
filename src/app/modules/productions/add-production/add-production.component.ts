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
  production = this._formBuilder.group([
    this.createProduction()
  ]);

  productionForm: FormGroup;

  constructor(
    private alertService: AlertService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    console.log("Inicio del componenete")
    this.generarFormularioProduccion()
  }

  createProduction(): FormGroup {
    return this._formBuilder.group({
      producto: [0, Validators.required],
      encargado: [0, Validators.required],
      fechaFin: ["", Validators.required],
      fechaInicio: ["", Validators.required],
      cantidad: [0, Validators.required]
    });
  }

  generarFormularioProduccion(){
    this.productionForm = this.fb.group({
      producto: [0, Validators.required],
      encargado: [0, Validators.required],
      fechaFin: ["", Validators.required],
      fechaInicio: ["", Validators.required],
      cantidad: [0, Validators.required]
    })
  }
  
  async sendproduction() {
    if (this.productionForm.invalid){
      return
    }

    const nombreProducto= this.buscarElemento(this.cars, this.productionForm.value.producto)["name"]
    const nombreEncargado= this.buscarElemento(this.cars2, this.productionForm.value.encargado)["name"]
    const AlertService = await this.alertService.alertSimple(
      'Confirmación de Envío',
      //'¿Está seguro de que desea enviar la solicitud con los datos actuales?',
      `<p> Producto: ${nombreProducto} </p> <p>Encargado: ${nombreEncargado}</p>
      <p> Fecha Inicio: ${this.productionForm.value.fechaInicio} </p> <p> Fecha Fin: ${this.productionForm.value.fechaFin} </p>
      <p> Cantidad a Fabricar: ${this.productionForm.value.cantidad} </p>`,
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

  
}
