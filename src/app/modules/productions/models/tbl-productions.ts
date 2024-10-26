import { CRUD } from 'src/app/models/tbl-information.model';

export const tbl_producction_feedstock = {
  headers: [
    'Producto',
    'Materia Prima',
    'Cantidad por unidad',
    'Unidad de Medida',
    'Stock',
    'Necesario',
    'Disponibilidad',
  ],
  rows: [
    { value: 'Producto' },
    { value: 'Materia Prima' },
    { value: 'Cantidad' },
    { value: 'stock' },
    { value: 'Unidad de Medida' },
    { value: 'Necesario' },
    { value: 'Disponibilidad' },
  ],
  btn: [],
};



export const tbl_production = {
  headers: [
    'Id',
    'Producto',
    'Talla',
    'Color',
    'Cantidad',
    'Estado',
    'Etapa',
    'Fecha Inicio',
    'Fecha Fin Estimada',
  ],
  rows: [
    { value: 'id' },
    { value: 'producto.nombre' },
    { value: 'talla' },
    { value: 'color' }, 
    { value: 'cantidad' },
    { value: 'estado' },
    { value: 'etapa' },
    { value: 'fechaInicio', pipe:"date" },
    { value: 'fechaFinEstimada', pipe:"date"  },
  ],
  btn: [
    {
      icon: 'fa-solid fa-hand-point-right',
      color: 'warning',
      name: CRUD.ACCTION,
      visible: 'next',
    },
    {
      icon: 'fa-solid fa-eye',
      color: 'primary',
      name: CRUD.READ,
      visible: '',
    },
  ],
};

