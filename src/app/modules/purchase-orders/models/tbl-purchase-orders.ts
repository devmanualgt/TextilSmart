import { CRUD } from 'src/app/models/tbl-information.model';

export const tbl_purchase_orders = {
  headers: [
    'Codigo',
    'Proveedor',
    'Descripcion',
    'Costo Total',
    'Unidades',
    'Estado',
  ],
  rows: [
    { value: 'id' },
    { value: 'proveedor.nombre' },
    { value: 'descripcion' },
    { value: 'total' },
    { value: 'totalPiezas' },
    { value: 'estado' },
  ],
  btn: [
    {
      icon: 'fa-solid fa-eye',
      color: 'primary',
      name: CRUD.READ,
      visible: '',
    },
  ],
};


export const tbl_purchase_orders_detail = {
  headers: [
    'Producto',
    'Unidad de Medida',
    'Precion Unitario (Q)',
    'Cantidad',
    'Subtotal',
  ],
  rows: [
    { value: 'materiaPrima.nombre' },
    { value: 'materiaPrima.unidadMedida' },
    { value: 'materiaPrima.precioUnitario' },
    { value: 'cantidad' },
    { value: 'subTotal' },
  ],

  btn: [
  ],
};
