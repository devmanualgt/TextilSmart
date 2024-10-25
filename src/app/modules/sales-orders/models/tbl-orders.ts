import { CRUD } from 'src/app/models/tbl-information.model';

export const tbl_orders = {
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
        visible: '',
      },
      {
        icon: 'fa-solid fa-eye',
        color: 'primary',
        name: CRUD.READ,
        visible: '',
      },
    ],
  };
  
  