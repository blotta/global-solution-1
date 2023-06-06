import * as React from 'react';
import { DataGrid, GridActionsCellItem, GridDeleteIcon } from '@mui/x-data-grid';
import { CancelOutlined } from '@mui/icons-material';


export default function OrderList({ orders, deleteOrder }) {

  const columns = [
    { field: 'type', headerName: 'Tipo', width: 130 },
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
      width: 160,
      valueGetter: (params) => {
        if (params.address == null) return "Excluído";
        return `${params.row.address.street || ''} ${params.row.address.number?.toString() || ''} ${params.row.address.city || ''} - ${params.row.address.state || ''}`
      }
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 130
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
              onClick={() => {handleCancelOrder(params.row.id)}}
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