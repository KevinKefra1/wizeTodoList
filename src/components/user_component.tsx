import React, { useEffect } from "react";
import { listAssignes } from "../api/data";
import { useState } from "react";
import { Assignee } from "../model";
import ModalComponent from "./modalComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlus
} from "@fortawesome/free-solid-svg-icons";
import TableAssignee from "./tableUser";
import FormUserComponent from "./form/formUserComponent";
import { useUsers } from "../hooks/useUsers";





const UserComponent: React.FC = () => {
    const { users, loading, error, addUser, deleteUser } = useUsers();

    // const [listData, setListData] = useState<Assignee[]>([...listAssignes]);
    const [filterUsers, setFilterUser] = useState<Assignee[]>();

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

    const onAddUser = (newUser: Assignee) => {
        
        setSelectedUser(undefined);
        addUser(newUser)
        handleCloseModal();
    };





    const openUser = (user: Assignee) => {
        handleCloseModal();
        setSelectedUser(user);
        handleOpenModal();
    };


    const handleDeleteUser = (oldUser: Assignee) => {
        // setListData((prevTasks) => prevTasks.filter((task) => task.name !== oldUser.name));
        setSelectedUser(undefined)
        deleteUser(oldUser)
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
                        className="w-full  p-3 border border-blue-500 text-blue-500 rounded-full hover:bg-blue-500 hover:text-white"
                    >
                        <FontAwesomeIcon icon={faPlus} className="w-4 h-4 pr-2"></FontAwesomeIcon>
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
                        children={<FormUserComponent onAddUser={onAddUser} onDeleteUser={handleDeleteUser} user={selectedUser} />}
                    ></ModalComponent>
                )}
                {/* <button onClick={() => handleDeleteTask(1)}>delete</button> */}

                {TableAssignee(filterUsers ?? users, openUser)}
            </div>
        </div>
    );
};

export default UserComponent;


