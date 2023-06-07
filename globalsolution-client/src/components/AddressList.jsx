import * as React from 'react';
import { DataGrid, GridActionsCellItem, GridDeleteIcon } from '@mui/x-data-grid';


export default function AddressList({ addresses, deleteAddress }) {

  const columns = [
    {
      field: 'address',
      headerName: 'Endereço',
      // sortable: false,
      // width: "100%",
      flex: 1,
      valueGetter: (params) => {
        if (params.row == null) return "Excluído";
        return `${params.row.street || ''} ${params.row.number?.toString() || ''} ${params.row.city || ''} - ${params.row.state || ''}`
      }
    },
    {
      field: 'actions',
      type: 'actions',
      getActions: (params) => {
        return [

          <GridActionsCellItem
            icon={<GridDeleteIcon />}
            label="Deletar"
            onClick={() => { handleDeleteAddress(params.row.id) }}
          />
        ]
      }
    }
  ];

  const handleDeleteAddress = async (id) => {
    console.log('deleting', id);
    await deleteAddress(id)
  }

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={addresses}
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