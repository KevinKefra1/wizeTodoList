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