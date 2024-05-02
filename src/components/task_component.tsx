import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { listTasks } from '../api/data';
import { useState } from 'react';
import { Label, PriorityOfTask, Task } from '../model';

const TaskComponent: React.FC = () => {
    const [listData, setListData] = useState<Task[]>([...listTasks]);

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'title', headerName: 'Titre', width: 200 },
        { field: 'description', headerName: 'Titre', width: 200 },
        { field: 'startDate', headerName: 'Titre', width: 200 },
    ];
    const addTask = () => {

        const newTask: Task = {
            id: 1,
            title: "Tâche 1",
            assignee: { id: 1, name: "kevin kefra", email: "kefra@example.com", phone: "+1234567890" },
            startDate: new Date(2024, 4, 1),
            endDate: new Date(2024, 4, 30),
            priority: PriorityOfTask.MEDIUM,
            labels: [Label.HTML],
            description: "Description de la tâche 1"
        };

        setListData(prevTasks => [...prevTasks, newTask])
    }

    const handleDeleteTask = (taskId: number) => {
        setListData(prevTasks => prevTasks.filter(task => task.id !== taskId));
    };
    return (
        <div>
            <button onClick={() => addTask()}>ajouter</button>
            <button onClick={() => handleDeleteTask(1)}>delete</button>
            <DataGrid rows={listData} columns={columns} />
        </div>
    );
};

export default TaskComponent;
