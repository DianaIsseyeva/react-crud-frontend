import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { TableProps } from '../../types';

const DataTable: FC<TableProps> = ({ columns, rows, onDelete }) => {
  const navigate = useNavigate();

  const handleEdit = (id: number) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = (id: number) => {
    if (onDelete) {
      onDelete(id);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            {columns.map(column => (
              <TableCell key={column.id} align={column.align || 'left'}>
                {column.label}
              </TableCell>
            ))}
            <TableCell align='center'>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              {columns.map(column => (
                <TableCell key={column.id} align={column.align || 'left'}>
                  {column.id === 'description' ? (
                    <div dangerouslySetInnerHTML={{ __html: row[column.id] }} />
                  ) : column.id === 'image' ? (
                    <img src={row[column.id]} alt={row['title']} width='100' />
                  ) : (
                    row[column.id]
                  )}
                </TableCell>
              ))}
              <TableCell align='center'>
                <Button onClick={() => handleEdit(row.id)} variant='contained' color='primary'>
                  Edit
                </Button>
                <Button
                  onClick={() => handleDelete(row.id)}
                  variant='contained'
                  color='secondary'
                  style={{ marginLeft: 8 }}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
