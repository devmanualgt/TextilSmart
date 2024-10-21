export interface TblInformation {
  tbl_name: string;
  export_xls: boolean;
  scroll_tbl: boolean;
  headers: string[];
  rows: RowData[];
  btns: BtnData[];
}

export interface RowData {
  //header: string;
  value: any;
}

export interface BtnData {
  icon: string;
  color: string;
  name: string;
}

export interface FnData {
  data: Object;
  type: string;
}
