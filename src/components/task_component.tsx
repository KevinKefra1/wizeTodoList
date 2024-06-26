import React, { useEffect } from "react";
import { listMenu, listMenuLabel, listTasks } from "../api/data";
import { useState } from "react";
import { Task, Menu } from "../model";
import TableTasks from "./tableTask";
import ModalComponent from "./modalComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faDotCircle, faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { filterTask } from "../utils";
import { FormTaskComponent } from "./";
import { useTasks } from "../hooks/useTasks";
import { useTranslation } from 'react-i18next';


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
    const {t} = useTranslation();

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
                    <span>{t(menu.name.toLocaleLowerCase())}</span>
                </div>
            ))}
        </>
    );
}
type TaskComponentProps = {
    isOpen: boolean;
    onClick: () => void;
};

const TaskComponent: React.FC<TaskComponentProps> = ({ isOpen, onClick }) => {
    const { tasks, loading, error, addTask, deleteTask, users } = useTasks();
    const {t} = useTranslation();
    const [filterTasks, setFilterTask] = useState<Task[]>();

    const [showModal, setShowModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task>();
    const [menuSlected, setSelectedMenu] = useState<Menu>(listMenu[0]);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedTask(undefined);
    };

    const onAddTask = (newTask: Task) => {
        addTask(newTask)
        setSelectedTask(undefined);
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
        // setListData((prevTasks) => prevTasks.filter((task) => task.id !== oldTask.id));
        setSelectedTask(undefined)
        deleteTask(oldTask)
        setShowModal(false)
    };


    useEffect(() => {

        const data = filterTask(menuSlected.name, tasks);
        setFilterTask(data);
    }, [tasks, users, menuSlected])



    // if (loading) return <p>Chargement des tâches...</p>;
    // if (error) return <p>Erreur : {error}</p>;

    return (
        <div className="relative flex w-full h-full flex-row gap-8">
            <div className={`absolute z-40 ${isOpen ? "" : "w-0 hidden md:block"} md:relative shadow-lg md:shadow-md lg:w-1/4 bg-white h-full md:pr-8 rounded-r-xl`}>
                <div className="mt-6 mx-8 mr-16">
                    <button
                        type="submit"
                        onClick={handleOpenModal}
                        className="w-full   p-3 border border-blue-500 text-blue-500 rounded-full hover:bg-blue-500 hover:text-white"
                    >
                        <FontAwesomeIcon icon={faPlus} className="w-4 h-4 pr-2" />
                       {t("addTask")}
                    </button>
                </div>
                <div className="my-24 py-8 ">
                    {MenuComponent(onCLickMenu, menuSlected.id)}
                </div>
                <div>{LabelMenuComponent()}</div>
            </div>
            <div className="w-full bg-white h-full py-8 px-8 rounded-l-lg">
                {showModal && (
                    <ModalComponent
                        isOpen={showModal}
                        onClose={handleCloseModal}
                        title={t("addNewTask")}
                        children={<FormTaskComponent onAddTask={onAddTask} onDeleteTask={handleDeleteTask} task={selectedTask} listAssignes={users} />}
                    ></ModalComponent>
                )}
                {/* <button onClick={() => handleDeleteTask(1)}>delete</button> */}

                {TableTasks(filterTasks ?? tasks, openTask)}
            </div>
        </div>
    );
};

export default TaskComponent;
