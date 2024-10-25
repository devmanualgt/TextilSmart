
import { CRUD } from 'src/app/models/tbl-information.model';

export const tbl_type_productos = {
  headers: ['ID Producto', 'Nombre', 'Precio', 'Stock'], // Encabezados de la tabla
  rows: [
    { value: 'id' },       // Columna de ID
    { value: 'name' },     // Columna de Nombre del producto
    { value: 'price' },    // Columna de Precio
    { value: 'stock' },    // Columna de Stock
  ],
  btn: [
    {
      icon: 'fa-solid fa-eye',
      color: 'primary',
      name: CRUD.READ,       // Botón para ver detalles del producto
      visible: '',
    },
    {
      icon: 'fa-solid fa-pen-to-square',
      color: 'success',
      name: CRUD.UPDATE,     // Botón para editar producto
      visible: '',
    },
    {
      icon: 'fa-solid fa-trash',
      color: 'danger',
      name: CRUD.DELETE,     // Botón para eliminar producto
      visible: '',
    },
  ],
};

/*export const tbl_type_productos = {
  headers: ['', 'Tipo'],
  rows: [{ value: 'icon', icon: true }, { value: 'tipo_producto' }],
  btn: [
    {
      icon: 'fa-solid fa-eye',
      color: 'primary',
      name: CRUD.READ,
      visible: '',
    },
  ],
};*/
