export interface TblInformation {
  tbl_name: string;
  export_xls: boolean;
  scroll_tbl: boolean;
  headers: string[];
  rows: RowData[];
  btns: BtnData[];
}

export interface RowData {
  value: any;
  icon?: boolean;
  pipe?: string;
}

export interface BtnData {
  icon: string;
  color: string;
  name: CRUD;
  visible: string;
}

export interface FnData {
  data: any;
  type: CRUD;
}

export enum CRUD {
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete',
  ACCTION = 'action',
}
