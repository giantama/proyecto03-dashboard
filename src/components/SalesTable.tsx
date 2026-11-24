import { useMemo, useState } from 'react';
import {
  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, Typography,
} from '@mui/material';
import type { TableColumn, VideoGame } from '../types/VideoGame';

interface SalesTableProps {
  rows: VideoGame[];
  columns: TableColumn[];
}

type Order = 'asc' | 'desc';

/** Tabla de detalle reutilizable con orden por columna, paginación y scroll horizontal en móvil. */
export default function SalesTable({ rows, columns }: SalesTableProps) {
  const [orderBy, setOrderBy] = useState<keyof VideoGame>('Global_Sales');
  const [order, setOrder] = useState<Order>('desc');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const sorted = useMemo(() => {
    const dir = order === 'asc' ? 1 : -1;
    return [...rows].sort((a, b) => {
      const x = a[orderBy];
      const y = b[orderBy];
      return (typeof x === 'number' && typeof y === 'number' ? x - y : String(x).localeCompare(String(y))) * dir;
    });
  }, [rows, orderBy, order]);

  const maxPage = Math.max(0, Math.ceil(rows.length / rowsPerPage) - 1);
  const currentPage = Math.min(page, maxPage); // si cambian los filtros, no quedar en una página vacía
  const visible = sorted.slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage);

  const handleSort = (key: keyof VideoGame) => {
    setOrder(orderBy === key && order === 'desc' ? 'asc' : 'desc');
    setOrderBy(key);
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h2" component="h2">Detalle de Ventas</Typography>
      <Typography variant="caption" color="text.secondary">
        {rows.length.toLocaleString()} juegos filtrados · haz clic en un encabezado para ordenar
      </Typography>
      <TableContainer sx={{ mt: 1, overflowX: 'auto' }}>
        <Table size="small" sx={{ minWidth: 720 }}>
          <TableHead>
            <TableRow>
              {columns.map((c) => (
                <TableCell key={c.key} align={c.align ?? 'left'} sx={{ fontWeight: 700, bgcolor: '#f8fafc' }} sortDirection={orderBy === c.key ? order : false}>
                  <TableSortLabel active={orderBy === c.key} direction={orderBy === c.key ? order : 'desc'} onClick={() => handleSort(c.key)}>
                    {c.header}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {visible.map((r) => (
              <TableRow key={r.id} hover>
                {columns.map((c) => (
                  <TableCell key={c.key} align={c.align ?? 'left'}>{c.format ? c.format(r[c.key]) : String(r[c.key])}</TableCell>
                ))}
              </TableRow>
            ))}
            {visible.length === 0 && (
              <TableRow>
                <TableCell colSpan={columns.length} align="center" sx={{ py: 4, color: 'text.secondary' }}>
                  No hay juegos que coincidan con los filtros.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={rows.length}
        page={currentPage}
        onPageChange={(_, p) => setPage(p)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }}
        rowsPerPageOptions={[10, 25, 50]}
        labelRowsPerPage="Filas"
        labelDisplayedRows={({ from, to, count }) => `${from}–${to} de ${count.toLocaleString()}`}
      />
    </Paper>
  );
}
