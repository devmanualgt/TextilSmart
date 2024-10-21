export const tbl_list_instruction = {
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
      icon: 'fa-solid fa-eye',
      color: 'primary',
      name: 'Detalle',
    },
    {
      icon: 'fa-solid fa-pen-to-square',
      color: 'success',
      name: 'Editar',
    },
    {
      icon: 'fa-solid fa-trash',
      color: 'danger',
      name: 'Eliminar',
    },
  ],
};
