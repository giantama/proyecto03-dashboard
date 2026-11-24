import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import type { TableColumn, VideoGame } from '../types/VideoGame';

interface SalesTableProps {
  rows: VideoGame[];
  columns: TableColumn[];
}

/** Tabla de detalle reutilizable; en móvil tiene scroll horizontal dentro de su contenedor. */
export default function SalesTable({ rows, columns }: SalesTableProps) {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h2" component="h2">Detalle de Ventas</Typography>
      <Typography variant="caption" color="text.secondary">
        Juegos filtrados ordenados por ventas globales ({rows.length} registros)
      </Typography>
      <TableContainer sx={{ mt: 1, overflowX: 'auto' }}>
        <Table size="small" sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              {columns.map((c) => (
                <TableCell key={c.key} align={c.align ?? 'left'} sx={{ fontWeight: 700, bgcolor: '#f8fafc' }}>{c.header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((r) => (
              <TableRow key={r.id} hover>
                {columns.map((c) => (
                  <TableCell key={c.key} align={c.align ?? 'left'}>{c.format ? c.format(r[c.key]) : String(r[c.key])}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
