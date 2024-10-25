import { Component, Input, OnInit,ChangeDetectorRef, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from 'src/app/modules/products/services/product.service';
import { AlertService } from './../../../services/alert.service';
import { FnData, CRUD } from 'src/app/models/tbl-information.model';
import { FloatLabelType } from '@angular/material/form-field';
import { ComponentsModule } from 'src/app/components/components.module';
import { MaterialModule } from 'src/app/material.module';
import { CommonModule } from '@angular/common';

interface Category {
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule, ComponentsModule, CommonModule, MaterialModule],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']

})
export class AddProductComponent implements OnInit {
  @Input() info: FnData;
  private _formBuilder = inject(FormBuilder);
  productForm: FormGroup;
  categories: Category[] = [];
  form: FormGroup;
  productos = this._formBuilder.array([this.createProduct()]);

  constructor(
    private fb: FormBuilder,
    public activeModal: NgbActiveModal,
    private productService: ProductService,
    private alertService: AlertService,
    private cd: ChangeDetectorRef // Inyectar ChangeDetectorRef
    

    
  ) {this.form = this.fb.group({
    published: true,
    feedStockForm: this.fb.array([]),
  });}

  ngOnInit(): void {
    this.generateForm();
    this.getCategories();
  }
  createProduct(): FormGroup {
    return this._formBuilder.group({
      nombre: ['', Validators.required],
      cantidad: [0, Validators.required],
      
    });
  }

  addProduct() {
    this.productos.push(this.createProduct());
  }

  
  generateForm() {
    const disabled = [CRUD.READ].includes(this.info?.type) ? true : false;
    this.productForm = this.fb.group({
      name: [{ value: '', disabled: disabled }, Validators.required],
      description: [{ value: '', disabled: disabled }, Validators.required],
      price: [{ value: '', disabled: disabled }, Validators.required],
      imageUrl: [{ value: '', disabled: disabled }, Validators.required],
      category: [{ value: '', disabled: disabled }, Validators.required],
      
    });

    if (this.info) {
      this.setFormValues();
    }
  }
  
  


  // Obtener categorías de manera simulada
  getCategories() {
    this.categories = [
      { id: 1, nombre: 'Categoría 1' },
      { id: 2, nombre: 'Categoría 2' },
      { id: 3, nombre: 'Categoría 3' }
    ];
  }

  // Establecer valores si se está editando un producto existente
  setFormValues() {
    const data = this.info.data;
    this.productForm.patchValue({
      name: data.name,
      description: data.description,
      price: data.price,
      imageUrl: data.imageUrl,
      category: data?.category?.id,
    });

    
  }

  // Método para enviar el formulario
  async sendProduct() {
    if (this.productForm.invalid) {
      return;
    }

    await this.alertService.loader('Guardando...', 'El producto se está guardando', 0);
    let send;
    if (this.info?.type === CRUD.UPDATE) {
      send = await this.productService.update(this.productForm.value, this.info.data['id']);
    } else {
      send = await this.productService.create(this.productForm.value);
    }

    if (send.status) {
      this.alertService
        .alertSimple('Notificación', send.message, 'success', 'Aceptar', '', true)
        .then(() => {
          this.cerrarModal(true);
        });
    }
  }

  // Cerrar modal
  cerrarModal(refresh: boolean): void {
    const closeInfo = { origin: 'product', refresh };
    this.activeModal.close(closeInfo);
  }
}
