import React, { useEffect } from "react";
import { listMenu, listMenuLabel, listTasks } from "../api/data";
import { useState } from "react";
import { Label, LabelMenu, PriorityOfTask, Task, Menu } from "../model";
import TableTasks from "./tableTask";
import ModalComponent from "./modalComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCalendarMinus,
    faClock,
    faDotCircle,
    faRadiation,
    faUserFriends,
} from "@fortawesome/free-solid-svg-icons";
import { filterTask } from "../utils";
import { FormTaskComponent } from "./";



function LabelMenuComponent() {


    return (
        <div className="flex flex-col gap-4  items-start px-8">
            <span className="font-semibold text-2xl text-start">Labels</span>
            <div>{listMenuLabel.map((label) => (
                <div className="w-full my-2 flex gap-8 text-lg text-gray-600 items-center px-8">
                    <FontAwesomeIcon
                        icon={faDotCircle}
                        className={`text-${label.color}-500`}
                    />
                    <span>{label.name}</span>
                </div>
            ))}</div>
        </div>
    );
}

function MenuComponent(onClick: Function, idMenuSelected: number) {
    return (
        <>
            {listMenu.map((menu: Menu) => (
                <div
                    key={`menu-${menu.id}`}
                    onClick={(e) => onClick(menu)}
                    className={`w-full cursor-pointer h-14 text-gray-500 ${idMenuSelected === menu.id ? "bg-blue-50" : ""
                        } flex items-center px-8 gap-4 rounded-r-full`}
                >
                    <FontAwesomeIcon icon={menu.icon} />
                    <span>{menu.name}</span>
                </div>
            ))}
        </>
    );
}
const TaskComponent: React.FC = () => {
    const [listData, setListData] = useState<Task[]>([...listTasks]);
    const [filterTasks, setFilterTask] = useState<Task[]>();

    const [showModal, setShowModal] = useState(false);
    const [isSearchOrFilter, setSearchOrFilter] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task>();
    const [menuSlected, setSelectedMenu] = useState<Menu>(listMenu[0]);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedTask(undefined);
    };

    const addTask = (newTask: Task) => {
        console.log(newTask.description);
        const existingTaskIndex = listData.findIndex(
            (task) => task.id === newTask.id
        );

        if (existingTaskIndex !== -1) {
            const updatedTasks = [...listData];
            updatedTasks[existingTaskIndex] = newTask;
            setListData(updatedTasks);
            setSelectedTask(undefined);
        } else {
            setListData((prevTasks) => [...prevTasks, newTask]);
        }
        handleCloseModal();
    };





    const openTask = (task: Task) => {
        handleCloseModal();
        setSelectedTask(task);
        handleOpenModal();
    };

    const onCLickMenu = (menu: Menu) => {
        setSelectedMenu(menu);


    };

    const handleDeleteTask = (oldTask: Task) => {
        setListData((prevTasks) => prevTasks.filter((task) => task.id !== oldTask.id));
        setShowModal(false)
    };

    const handleSearch = () => { };


    useEffect(() => {

        const data = filterTask(menuSlected.name, listData);
        setFilterTask(data);
    }, [listData, menuSlected])

    return (
        <div className="flex w-full h-full flex-row gap-8">
            <div className="w-1/4 bg-white h-full pr-8">
                <div className="mt-6 mx-8 mr-16">
                    <button
                        type="submit"
                        onClick={handleOpenModal}
                        className="w-full   p-3 border border-blue-500 text-blue-500 rounded-full hover:bg-blue-500 hover:text-white"
                    >
                        Add Task
                    </button>
                </div>
                <div className="my-24 py-8 ">
                    {MenuComponent(onCLickMenu, menuSlected.id)}
                </div>
                <div>{LabelMenuComponent()}</div>
            </div>
            <div className="w-full bg-white h-full py-16 px-8">
                {showModal && (
                    <ModalComponent
                        isOpen={showModal}
                        onClose={handleCloseModal}
                        title={"Add new task"}
                        children={<FormTaskComponent onAddTask={addTask} onDeleteTask={handleDeleteTask} task={selectedTask} />}
                    ></ModalComponent>
                )}
                {/* <button onClick={() => handleDeleteTask(1)}>delete</button> */}

                {TableTasks(filterTasks ?? listData, openTask)}
            </div>
        </div>
    );
};

export default TaskComponent;
