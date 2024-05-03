import React from 'react';
import { listTasks } from '../api/data';
import { useState } from 'react';
import { Task } from '../model';
import TableTasks from './tableTask';
import ModalComponent from './modal';

const TaskComponent: React.FC = () => {
    const [listData, setListData] = useState<Task[]>([...listTasks]);
    const [showModal, setShowModal] = useState(false);
    const [task, setSelectedTask] = useState<Task>();

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const addTask = (newTask: Task) => {

        const existingTaskIndex = listData.findIndex((task) => task.id === newTask.id);

        if (existingTaskIndex !== -1) {
            const updatedTasks = [...listData];
            updatedTasks[existingTaskIndex] = newTask;
            setListData(updatedTasks);
        } else {
            setListData(prevTasks => [...prevTasks, newTask]);
        }
        handleCloseModal();

    }

    const openTask = (task: Task) => {
        handleCloseModal();
        setSelectedTask(task);
        handleOpenModal();
    }

    const handleDeleteTask = (taskId: number) => {
        setListData(prevTasks => prevTasks.filter(task => task.id !== taskId));
    };


    return (
        <div className='flex w-full h-full flex-row gap-8'>
            <div className='w-1/4 bg-white h-full'>
                <div className="mt-6 mx-4">
                    <button type="submit" onClick={handleOpenModal} className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600">Add Task</button>
                </div>
            </div>
            <div className='w-full bg-white h-full py-16 px-8'>
                {showModal && (
                    <ModalComponent isOpen={showModal} onClose={handleCloseModal} onAddTask={addTask} task={task}></ModalComponent>
                )}
                <button onClick={() => handleDeleteTask(1)}>delete</button>
                {TableTasks(listData, openTask)}
            </div>
        </div>
    );
};

export default TaskComponent;
