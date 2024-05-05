import { User, Task } from "./";

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: any,
    title: string

}



export interface ModalTaskProps {

    onAddTask: (task: Task) => void;
    onDeleteTask: (task: Task) => void;
    task?: Task;
    listAssignes: User[];
}



export interface ModalUserProps {

    onAddUser: (user: User) => void;
    onDeleteUser: (task: User) => void;
    user?: User;
    listAssignes: User[];
}