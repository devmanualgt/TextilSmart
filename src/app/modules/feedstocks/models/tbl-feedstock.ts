import { CRUD } from 'src/app/models/tbl-information.model';

export const tbl_feedstock = {
  headers: [
    'Codigo',
    'Material',
    'Stock',
    'Medida',
    'Proveedor',
    'Minimo',
    'Precio',
    'Descripcion',
  ],
  rows: [
    { value: 'id' },
    { value: 'nombre' },
    { value: 'stock' },
    { value: 'unidadMedida' },
    { value: 'proveedor.nombre' },
    { value: 'nivelMinimo' },
    { value: 'precioUnitario' },
    { value: 'descripcion' },
  ],
  btn: [
    {
      icon: 'fa-solid fa-cart-shopping',
      color: 'warning',
      name: CRUD.ACCTION,
      visible: 'realizarPedido',
    },
    {
      icon: 'fa-solid fa-eye',
      color: 'primary',
      name: CRUD.READ,
      visible: '',
    },

    {
      icon: 'fa-solid fa-pen-to-square',
      color: 'success',
      name: CRUD.UPDATE,
      visible: '',
    },
    {
      icon: 'fa-solid fa-trash',
      color: 'danger',
      name: CRUD.DELETE,
      visible: '',
    },
  ],
};
