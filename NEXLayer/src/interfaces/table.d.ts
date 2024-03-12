// TableTypes.ts
import { ColumnInstance, TableOptions, UsePaginationInstanceProps, UsePaginationState, UseSortByColumnProps, UseSortByInstanceProps, UseSortByState, UseGlobalFiltersInstanceProps, UseGlobalFiltersState } from "react-table";

export interface TableRow {
  id: string | number;
  [key: string]: any;
}

export interface TableInstance extends TableOptions<TableRow>,
  UseGlobalFiltersInstanceProps<TableRow>,
  UseSortByInstanceProps<TableRow>,
  UsePaginationInstanceProps<TableRow> {
  columns: Array<ColumnInstance<TableRow>>;
  data: TableRow[];
  state: {
    pageIndex: number;
    pageSize: number;
    globalFilter: string;
  } & UseSortByState<TableRow> &
  UsePaginationState<TableRow> &
  UseGlobalFiltersState<TableRow>;
}
