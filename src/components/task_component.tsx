import React from 'react';
import { listTasks } from '../api/data';
import { useState } from 'react';
import { Label, PriorityOfTask, Task } from '../model';
import TableTasks from './tableTask';
import ModalComponent from './modal';

const TaskComponent: React.FC = () => {
    const [listData, setListData] = useState<Task[]>([...listTasks]);
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const addTask = (newTask: Task) => {
        setListData(prevTasks => [...prevTasks, newTask]);
        handleCloseModal();
    }

    const handleDeleteTask = (taskId: number) => {
        setListData(prevTasks => prevTasks.filter(task => task.id !== taskId));
    };
    return (
        <div>
            <button onClick={handleOpenModal}>Ouvrir le modal</button>

            {showModal && (
                <ModalComponent isOpen={showModal} onClose={handleCloseModal} onAddTask={addTask}></ModalComponent>
            )}
            <button onClick={() => handleDeleteTask(1)}>delete</button>
            {TableTasks(listData)}
        </div>
    );
};

export default TaskComponent;
