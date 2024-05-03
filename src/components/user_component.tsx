import React, { useEffect } from "react";
import { listAssignes } from "../api/data";
import { useState } from "react";
import { Assignee } from "../model";
import ModalComponent from "./modalComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlus
} from "@fortawesome/free-solid-svg-icons";





const UserComponent: React.FC = () => {
    const [listData, setListData] = useState<Assignee[]>([...listAssignes]);
    const [filterTasks, setFilterUser] = useState<Assignee[]>();

    const [showModal, setShowModal] = useState(false);
    const [isSearchOrFilter, setSearchOrFilter] = useState(false);
    const [selectedUser, setSelectedUser] = useState<Assignee>();

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedUser(undefined);
    };

    const addUser = (newUser: Assignee) => {
        // console.log(newUser.name);
        // const existingUserIndex = listData.findIndex(
        //     (user) => user.name === newUser.name
        // );

        // if (existingUserIndex !== -1) {
        //     const updatedTasks = [...listData];
        //     updatedUsers[existingTaskIndex] = newTask;
        //     setListData(updatedTasks);
        //     setSelectedTask(undefined);
        // } else {
        //     setListData((prevTasks) => [...prevTasks, newTask]);
        // }
        handleCloseModal();
    };





    const openUser = (user: Assignee) => {
        handleCloseModal();
        setSelectedUser(user);
        handleOpenModal();
    };


    const handleDeleteUser = (oldUser: Assignee) => {
        setListData((prevTasks) => prevTasks.filter((task) => task.name !== oldUser.name));
        setShowModal(false)
    };



    // useEffect(() => {

    //     const data = filterTask(menuSlected.name, listData);
    //     setFilterUser(data);
    // }, [listData, menuSlected])

    return (
        <div className="flex w-full h-full flex-row gap-8">
            <div className="w-1/4 bg-white h-full pr-8">
                <div className="mt-6 mx-8 mr-16">
                    <button
                        type="submit"
                        onClick={handleOpenModal}
                        className="w-full   p-3 border border-blue-500 text-blue-500 rounded-full hover:bg-blue-500 hover:text-white"
                    >
                        Add User
                    </button>
                </div>

            </div>
            <div className="w-full bg-white h-full py-16 px-8">
                {showModal && (
                    <ModalComponent
                        isOpen={showModal}
                        onClose={handleCloseModal}
                        title={"Add new User"}
                        children={<div />}
                    ></ModalComponent>
                )}
                {/* <button onClick={() => handleDeleteTask(1)}>delete</button> */}

                {/* {TableTasks(filterTasks ?? listData, openTask)} */}
            </div>
        </div>
    );
};

export default UserComponent;


