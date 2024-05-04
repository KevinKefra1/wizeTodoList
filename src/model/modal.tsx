import { Assignee, Task } from "./";

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
    listAssignes:Assignee[];
}



export interface ModalUserProps {

    onAddUser: (user: Assignee) => void;
    onDeleteUser: (task: Assignee) => void;
    user?: Assignee;
}