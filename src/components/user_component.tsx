import React, { useEffect } from "react";
import { useState } from "react";
import { User } from "../model";
import ModalComponent from "./modalComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlus
} from "@fortawesome/free-solid-svg-icons";
import TableAssignee from "./tableUser";
import FormUserComponent from "./form/formUserComponent";
import { useUsers } from "../hooks/useUsers";
import { useTranslation } from "react-i18next";



type UserComponentProps = {
    isOpen: boolean;
    onClick: () => void;
};

const UserComponent: React.FC<UserComponentProps> = ({ isOpen, onClick }) => {
    const { users,addUser, deleteUser } = useUsers();
    const { t } = useTranslation();

    // const [listData, setListData] = useState<User[]>([...listAssignes]);
    const [filterUsers, setFilterUser] = useState<User[]>();

    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User>();

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedUser(undefined);
    };

    const onAddUser = (newUser: User) => {

        setSelectedUser(undefined);
        addUser(newUser)
        handleCloseModal();
    };





    const openUser = (user: User) => {
        handleCloseModal();
        setSelectedUser(user);
        handleOpenModal();
    };


    const handleDeleteUser = (oldUser: User) => {
        // setListData((prevTasks) => prevTasks.filter((task) => task.name !== oldUser.name));
        setSelectedUser(undefined)
        deleteUser(oldUser)
        setShowModal(false)
    };



    useEffect(() => {

        // const data = filterTask(menuSlected.name, listData);
        // setFilterUser(data);
    }, [users])

    return (
        <div className="flex w-full h-full flex-row gap-8">
            <div className={`absolute z-40 ${isOpen ? "" : "w-0 hidden md:block"} md:relative shadow-lg md:shadow-md lg:w-1/4 bg-white h-full md:pr-8 rounded-r-xl`}>
                <div className="mt-6 mx-8 mr-16">
                    <button
                        type="submit"
                        onClick={handleOpenModal}
                        className="w-full  p-3 border border-blue-500 text-blue-500 rounded-full hover:bg-blue-500 hover:text-white"
                    >
                        <FontAwesomeIcon icon={faPlus} className="w-4 h-4 pr-2"></FontAwesomeIcon>
                        {t('addUser')}
                    </button>
                </div>

            </div>
            <div className="w-full bg-white h-full py-8 px-8 rounded-l-xl">
                {showModal && (
                    <ModalComponent
                        isOpen={showModal}
                        onClose={handleCloseModal}
                        title={t("addNewUser")}
                        children={<FormUserComponent onAddUser={onAddUser} onDeleteUser={handleDeleteUser} user={selectedUser} />}
                    ></ModalComponent>
                )}

                {TableAssignee(filterUsers ?? users, openUser)}
            </div>
        </div>
    );
};

export default UserComponent;


