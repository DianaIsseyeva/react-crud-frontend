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
              rows.map(row => (
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
                            WebkitLineClamp: 3,
                            height: '100%',
                          }}
                        />
                      ) : column.id === 'image' ? (
                        <img src={row[column.id]} alt={row['title']} style={{ maxHeight: '80px', width: 'auto' }} />
                      ) : (
                        row[column.id]
                      )}
                    </TableCell>
                  ))}
                  <TableCell align='center'>
                    <div className='flex flex-wrap justify-center items-center gap-5'>
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
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default DataTable;
