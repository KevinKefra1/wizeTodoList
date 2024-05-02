import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { listTasks } from '../api/data';

const TaskComponent: React.FC = () => {


    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'title', headerName: 'Titre', width: 200 },
        { field: 'description', headerName: 'Titre', width: 200 },
        { field: 'startDate', headerName: 'Titre', width: 200 },
    ];

    return (
        <DataGrid rows={listTasks} columns={columns} />
    );
};

export default TaskComponent;
