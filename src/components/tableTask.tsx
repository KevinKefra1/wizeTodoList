import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Task } from '../model';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'title', headerName: 'Titre', width: 200, },
    { field: 'description', headerName: 'Titre', width: 200 },
    { field: 'startDate', headerName: 'Titre', width: 200 },
];

export default function TableTasks(tasks: Task[], onClick: Function) {
    const handleRowClick = (event: any) => {
        console.log(event)
        //   setSelectedRowId(event.rowId);
        //   setOpenEditModal(true);
        console.log(event)
        onClick(event.row);
    };
    return (
        <div >
            <DataGrid
                rows={tasks}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                onRowClick={handleRowClick}
            />
        </div>
    );
}
