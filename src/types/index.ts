export interface TableColumn {
  id: keyof TableRowData;
  label: string;
  align?: 'left' | 'right' | 'center';
}

export interface TableRowData {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
}

export interface TableProps {
  columns: TableColumn[];
  rows: TableRowData[];
  onDelete?: (id: number) => void;
}
