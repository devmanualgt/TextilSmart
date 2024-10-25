import { CRUD } from 'src/app/models/tbl-information.model';

export const tbl_orders = {
  headers: [
    'Id',
    'Nombre',
    'Apellido',
    'Tipo Entrega',
    'Tipo Pago',
    'Total',
    'Estado',
    'Fecha pedido',
  ],
  rows: [
    { value: 'id' },
    { value: 'cliente.nombre' },
    { value: 'cliente.apellido' },
    { value: 'tipoEntrega' },
    { value: 'tipoPago' },
    { value: 'total' },
    { value: 'estado' },
    { value: 'createdAt', pipe: 'date' },
  ],
  btn: [
    {
      icon: 'fa-solid fa-hand-point-right',
      color: 'warning',
      name: CRUD.ACCTION,
      visible: 'siguienteEstado',
    },
    {
      icon: 'fa-solid fa-eye',
      color: 'primary',
      name: CRUD.READ,
      visible: '',
    },
  ],
};

export const tbl_orders_detail = {
  headers: ['Producto', 'Tipo Product', 'Cantidad', 'Subtotal'],
  rows: [
    { value: 'producto.nombre' },
    { value: 'producto.tipo_producto' },
    { value: 'cantidad' },
    { value: 'subTotal' },
  ],
  btn: [],
};
