import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TableProps } from '../../types';

const DataTable: FC<TableProps> = ({ columns, rows, onDelete }) => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEdit = (id: number) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = (id: number) => {
    if (onDelete) {
      onDelete(id);
    }
  };

  return (
    <Paper>
      <TableContainer>
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
            {rows &&
              rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => (
                <TableRow key={row.id} sx={{ 'height': '100px', '&:last-child td, &:last-child th': { border: 0 } }}>
                  {columns.map(column => (
                    <TableCell
                      key={column.id}
                      align={column.align || 'left'}
                      sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                    >
                      {column.id === 'description' ? (
                        <div
                          dangerouslySetInnerHTML={{ __html: row[column.id] }}
                          style={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: 3, // Limits the description to 3 lines
                            height: '100%', // Ensures the height fits within the fixed row height
                          }}
                        />
                      ) : column.id === 'image' ? (
                        <img
                          src={row[column.id]}
                          alt={row['title']}
                          style={{ maxHeight: '80px', width: 'auto' }} // Adjust image size to fit within the row
                        />
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
      <TablePagination
        className='hidden'
        rowsPerPageOptions={[5, 10, 25]}
        component='div'
        count={rows ? rows.length : 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default DataTable;
