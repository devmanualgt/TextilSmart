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
