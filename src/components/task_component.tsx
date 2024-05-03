import React from 'react';
import { listTasks } from '../api/data';
import { useState } from 'react';
import { Task } from '../model';
import TableTasks from './tableTask';
import ModalComponent from './modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarMinus, faClock, faRadiation, faUser, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { Menu } from '@mui/base';


interface Menu {
    id: number,
    name: string,
    icon: any
}


const listMenu: Menu[] = [
    {
        id: 1,
        name: "All",
        icon: faUserFriends,
    },
    {
        id: 2,
        name: "Priority",
        icon: faRadiation,
    },
    {
        id: 3,
        name: "Today",
        icon: faCalendarMinus,
    },
    {
        id: 4,
        name: "Completed",
        icon: faClock,
    },
];

function MenuComponent(onClick: Function, idMenuSelected: number) {


    return (
        <>
            {listMenu.map((menu: Menu) => (
                <div
                    key={`menu-${menu.id}`}
                    onClick={e => onClick(menu)}
                    className={`w-full cursor-pointer h-14 text-gray-500 ${idMenuSelected === menu.id ? "bg-blue-50" : ""} flex items-center px-8 gap-4 rounded-r-full`} >
                    <FontAwesomeIcon icon={menu.icon} />
                    <span>{menu.name}</span>
                </div>
            ))}
        </>
    );
}
const TaskComponent: React.FC = () => {
    const [listData, setListData] = useState<Task[]>([...listTasks]);
    const [showModal, setShowModal] = useState(false);
    const [task, setSelectedTask] = useState<Task>();
    const [menuSlected, setSelectedMenu] = useState<Menu>(listMenu[0]);

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

    const onCLickMenu = (menu: Menu) => {
        setSelectedMenu(menu);
    }

    const handleDeleteTask = (taskId: number) => {
        setListData(prevTasks => prevTasks.filter(task => task.id !== taskId));
    };


    return (
        <div className='flex w-full h-full flex-row gap-8'>
            <div className='w-1/4 bg-white h-full pr-8'>
                <div className="mt-6 mx-8 mr-16" >
                    <button type="submit" onClick={handleOpenModal} className="w-full   p-3 border border-blue-500 text-blue-500 rounded-full hover:bg-blue-600">Add Task</button>
                </div>
                <div className='my-24 py-8 '>
                    {MenuComponent(onCLickMenu, menuSlected.id)}
                </div>
            </div>
            <div className='w-full bg-white h-full py-16 px-8'>
                {showModal && (
                    <ModalComponent isOpen={showModal} onClose={handleCloseModal} onAddTask={addTask} task={task}></ModalComponent>
                )}
                {/* <button onClick={() => handleDeleteTask(1)}>delete</button> */}

                {TableTasks(listData, openTask)}
            </div>
        </div>
    );
};

export default TaskComponent;
