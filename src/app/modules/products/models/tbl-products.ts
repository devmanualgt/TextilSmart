import { CRUD } from 'src/app/models/tbl-information.model';

export const tbl_type_productos = {
  headers: ['', 'Tipo', 'Atributos'],
  rows: [
    { value: 'icon', icon: true },
    { value: 'tipo_producto' },
    { value: 'atributos_list' },
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

export const tbl_productos = {
  headers: [
    'Codigo',
    'Nombre',
    'Stock',
    'Disponibilidad',
    'Tipo',
    'Precio',
    'Descripcion',
  ],
  rows: [
    { value: 'id' },
    { value: 'nombre' },
    { value: 'stock' },
    { value: 'disponible' },
    { value: 'tipo_producto' },

    { value: 'precio' },
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
