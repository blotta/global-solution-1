import * as React from 'react';
import { DataGrid, GridActionsCellItem, GridDeleteIcon } from '@mui/x-data-grid';
import { CancelOutlined } from '@mui/icons-material';
import OrderTypeIcon from './OrderTypeIcon';
import { orderStatusEnumToWord, orderTypeEnumToWord } from '../utils/orderUtils';
import { Box, Tooltip } from '@mui/material';


export default function OrderList({ orders, deleteOrder }) {

  const columns = [
    {
      field: 'type',
      headerName: 'Tipo',
      width: 70,
      sortable: false,
      renderCell: (params) => (
        <Tooltip title={orderTypeEnumToWord(params.row.type)}>
          <Box>
            <OrderTypeIcon type={params.row.type} />
          </Box>
        </Tooltip>
      )
    },
    {
      field: 'createdAt',
      headerName: 'Criado',
      type: 'date',
      width: 90,
      valueGetter: (params) =>
        new Date(params.row.createdAt)
    },
    {
      field: 'scheduledDate',
      headerName: 'Agendado',
      type: 'date',
      width: 90,
      valueGetter: (params) =>
        new Date(params.row.scheduledDate)
    },
    {
      field: 'pickedUpAt',
      headerName: 'Coletado',
      type: 'date',
      width: 90,
      valueGetter: (params) => {
        if (params.row.pickedUpAt != null)
          return new Date(params.row.pickedUpAt)
        return null
      }
    },
    {
      field: 'address',
      headerName: 'Endereço',
      sortable: false,
      flex: 1,
      valueGetter: (params) => {
        if (params.row.address == null) return "Excluído";
        return `${params.row.address.street || ''} ${params.row.address.number?.toString() || ''} ${params.row.address.city || ''} - ${params.row.address.state || ''}`
      }
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 130,
      valueGetter: (params) => {
        return orderStatusEnumToWord(params.row.status)
      }
    },
    {
      field: 'actions',
      type: 'actions',
      headername: "Ações",
      getActions: (params) => {
        if (["Created"].includes(params.row.status)) {
          return [

            <GridActionsCellItem
              icon={<CancelOutlined />}
              label="Cancelar"
              onClick={() => { handleCancelOrder(params.row.id) }}
            />
          ]
        }
        return [];
      }
    }
  ];

  const handleCancelOrder = (id) => {
    console.log('canceling order', id);
    deleteOrder(id)
  }

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={orders}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
    </div>
  );
}