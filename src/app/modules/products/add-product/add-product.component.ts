import {
  Component,
  Input,
  OnInit,
  ChangeDetectorRef,
  inject,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from 'src/app/modules/products/services/product.service';
import { AlertService } from './../../../services/alert.service';
import { FnData, CRUD } from 'src/app/models/tbl-information.model';
import { FloatLabelType } from '@angular/material/form-field';
import { ComponentsModule } from 'src/app/components/components.module';
import { MaterialModule } from 'src/app/material.module';
import { CommonModule } from '@angular/common';
import { FeedstockService } from '../../feedstocks/services/feedstock.service';

interface Category {
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    CommonModule,
    MaterialModule,
  ],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
  @Input() info: FnData;
  private _formBuilder = inject(FormBuilder);
  productForm: FormGroup;
  categories: Category[] = [];
  form: FormGroup;
  productos = this._formBuilder.array([this.createProduct()]);
  float: FloatLabelType = 'auto';
  tipos: any = [];
  categorias: any = [];
  materiaPrima: any = [];
  value: any = [];
  atributos: any = [];
  constructor(
    private fb: FormBuilder,
    public activeModal: NgbActiveModal,
    private productService: ProductService,
    private feedstockService: FeedstockService,
    private alertService: AlertService,
    private cd: ChangeDetectorRef // Inyectar ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      published: true,
      feedStockForm: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.generateForm();
    this.getCategories();
    this.getData();
  }
  createProduct(): FormGroup {
    return this._formBuilder.group({
      materiaPrima: ['', Validators.required],
      cantidad: [0, Validators.required],
    });
  }

  addProduct() {
    this.productos.push(this.createProduct());
  }

  async getData() {
    try {
      // Mostrar loader
      this.alertService.loader('Cargando...', 'Obteniendo datos...', 0);

      // Realizar todas las solicitudes en paralelo
      const [tipos, categorias, materiales] = await Promise.all([
        this.productService.getTypes(),
        this.productService.getCategories(),
        this.feedstockService.find(),
      ]);

      // Validar que las respuestas sean exitosas
      const allSuccessful = [tipos, categorias, materiales].every(
        (res) => res.status
      );

      if (allSuccessful) {
        // Asignar los datos si todo fue exitoso
        this.tipos = tipos.data;
        this.categorias = categorias.data;
        this.materiaPrima = materiales.data;
        this.alertService.close();
      } else {
        // Si alguna respuesta no fue exitosa, lanzar un error
        throw new Error('Error al cargar algunos de los datos.');
      }
    } catch (error) {
      // Capturar cualquier error y mostrar una alerta
      this.alertService.errorAlertNorm(
        'Error',
        'No se pudieron cargar los datos.'
      );
      console.error('Error al cargar datos:', error);
    }
  }

  generateForm() {
    const disabled = [CRUD.READ].includes(this.info?.type) ? true : false;
    this.productForm = this.fb.group({
      url: [{ value: '', disabled: disabled }, Validators.required],
      nombre: [{ value: '', disabled: disabled }, Validators.required],
      precio: [{ value: '', disabled: disabled }, Validators.required],
      descripcion: [{ value: '', disabled: disabled }, Validators.required],
      categorias: [{ value: '', disabled: disabled }, Validators.required],
      tipo_producto: [{ value: '', disabled: disabled }, Validators.required],
      valores: [{ value: '', disabled: disabled }, Validators.required],
      materiales: this.productos,
    });

    if (this.info) {
      this.setFormValues();
    }

    this.productForm.get('tipo_producto')?.valueChanges.subscribe(() => {
      this.getValuesFeestock();
    });
  }

  async getValuesFeestock() {
    const tipo = this.productForm.get('tipo_producto')?.value;
    console.log(tipo);
    this.atributos = this.tipos.find(
      (t: any) => t.tipo_producto === tipo
    ).atributos;
    console.log(this.atributos);
  }

  // Obtener categorías de manera simulada
  getCategories() {
    this.categories = [
      { id: 1, nombre: 'Categoría 1' },
      { id: 2, nombre: 'Categoría 2' },
      { id: 3, nombre: 'Categoría 3' },
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
    console.log(this.productForm.value);

    if (this.productForm.invalid) {
      return;
    }

    await this.alertService.loader(
      'Guardando...',
      'El producto se está guardando',
      0
    );
    let send;
    if (this.info?.type === CRUD.UPDATE) {
      send = await this.productService.update(
        this.productForm.value,
        this.info.data['id']
      );
    } else {
      send = await this.productService.create(this.productForm.value);
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

  onAttributeSelected(event: any, index: number) {
    this.value[index] = event.value;
    if (this.value.lenght <= this.atributos.lenght) {
      return;
    }
    this.productForm.get('valores')?.setValue(this.value);
  }
}
