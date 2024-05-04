import Assignee from "./assigne";
import Task from "./task";

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: any,
    title:string

}



export interface ModalTaskProps {

    onAddTask: (task: Task) => void;
    onDeleteTask: (task: Task) => void;
    task?: Task;
}



export interface ModalUserProps {

    onAddUser: (user: Assignee) => void;
    onDeleteUser: (task: Assignee) => void;
    user?: Assignee;
}