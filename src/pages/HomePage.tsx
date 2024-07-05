import { FC } from 'react';
import DataTable from '../shared/ui/DataTable';
import { TableColumn, TableRowData } from '../types';

interface HomePageProps {
  columns: TableColumn[];
  rows: TableRowData[];
  onDelete: (id: number) => void;
}

const HomePage: FC<HomePageProps> = ({ columns, rows, onDelete }) => {
  return (
    <div>
      <h1>Home Page</h1>
      <DataTable columns={columns} rows={rows} onDelete={onDelete} />
    </div>
  );
};

export default HomePage;
