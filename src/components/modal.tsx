import React, { useState } from 'react';
import { listAssignes } from '../api/data';
import { Label, PriorityOfTask, Task } from '../model';



interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddTask: (task: Task) => void;
    task?: Task;
}



const ModalComponent: React.FC<ModalProps> = ({ isOpen, onClose, onAddTask, task }) => {
    const [formData, setFormData] = useState({ title: task?.title ?? "", description: task?.description ?? "", startDate: task?.startDate ?? new Date(), endDate: task?.endDate ?? undefined, labels: task?.labels ?? [Label.CSS], assignee: task?.assignee ?? listAssignes[0], priority: task?.priority ?? PriorityOfTask.HIGH, });
    const [isValidTitle, setIsValidTitle] = useState(true);
    const { title, description, startDate, labels, priority, assignee } = formData;

    const [selectedLabels, setSelectedLabels] = useState<string[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOptions = Array.from(e.target.selectedOptions).map((option) => option.value);
        console.log(selectedOptions);
        setSelectedLabels(selectedOptions);
    };



    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleDateChange = (event: any) => {
        const { name, value } = event.target;

        setFormData({ ...formData, [name]: new Date(value) });
    };
    const handlePriorityChange = (priority: any) => {

        setFormData({ ...formData, priority });
    };


    const handleAssigneChange = (e: any) => {
        const assigneeId = Number(e.target.value);
        const assignee = listAssignes.find(assignee => assignee.id === assigneeId);
        console.log(assignee?.email);
        setFormData({ ...formData, assignee: assignee ?? listAssignes[1] });
    };

    const handleAddTask = (event: any) => {
        event.preventDefault();
        if (title.trim().length < 3) {

            setIsValidTitle(false);
            return;
        }
        else {
            const newTask: Task = {
                id: task?.id ?? Math.floor(Math.random() * 1000000) + 1,
                title: formData.title,
                assignee: assignee,
                startDate: startDate,
                endDate: task?.endDate ?? undefined,
                priority: priority,
                labels: [Label.HTML],
                description: formData.description
            };
            onAddTask(newTask);
        }
    };


    ;


    if (!isOpen) {
        return null;
    }

    return (
        <div className=' overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center  md:inset-0 h-full max-h-full' style={{
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }}>
            <div className="relative  w-80  ld:w-full max-w-80 lg:max-w-3xl max-h-full " >
                <div className="relative rounded-lg shadow dark:bg-gray-700 bg-white ">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-600 dark:text-white">
                            Add new task
                        </h3>
                        <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={onClose}>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className=' px-4 md:px-8 mt-4'>
                        <form onSubmit={handleAddTask} className="flex flex-col gap-8">
                            <div className="mt-4 flex flex-col items-start ">
                                <input type="text" name="title" placeholder='Task Title' className="mt-1 p-4 w-full border rounded-md" required value={title}
                                    onChange={handleInputChange} />
                                <span className={`${isValidTitle ? "hidden" : ""} mt-2 `}>Title is not valid</span>
                            </div>

                            <div className='w-full  grid grid-cols-1  md:grid-cols-2 xl:grid-cols-4 gap-4'>
                                <select
                                    className="mt-1 p-4 bg-white border  text-gray-900 text-sm rounded-md focus:outline-none focus:ring-blue-500 focus:border-gray-900 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    value={priority}
                                    onChange={e => handlePriorityChange(e.target.value)}
                                >
                                    <option value={PriorityOfTask.LOW}>LOW</option>
                                    <option value={PriorityOfTask.MEDIUM}>MEDIUM</option>
                                    <option value={PriorityOfTask.HIGH}>HIGH</option>
                                </select>

                                <select
                                    className='mt-1 p-4 bg-white border  text-gray-900 text-sm rounded-md focus:outline-none focus:ring-blue-500 focus:border-gray-900 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                    value={assignee.id ?? ''}
                                    onChange={handleAssigneChange}
                                >
                                    <option value="">Sélectionner un assigné</option>
                                    {listAssignes.map(assignee => (
                                        <option key={assignee.id} value={assignee.id}>
                                            {assignee.name}
                                        </option>
                                    ))}
                                </select>


                                <select value={selectedLabels} onChange={handleChange} className='mt-1 p-4 bg-white border  text-gray-900 text-sm rounded-md focus:outline-none focus:ring-blue-500 focus:border-gray-900 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
                                    {Object.entries(Label).map(([key, value]) => (
                                        <option key={value} value={value}>
                                            {key}
                                        </option>
                                    ))}
                                </select>

                                <input type="date" className='mt-1 p-4 bg-white border  text-gray-900 text-sm rounded-md focus:outline-none focus:ring-blue-500 focus:border-gray-900 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' name="startDate" value={startDate.toISOString().substring(0, 10)} onChange={handleDateChange} />

                            </div>

                            <textarea name="description"
                                className=" min-h-36 h-36 appearance-none block w-full  text-gray-700 border border-gray-200 rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white "

                                placeholder='Description' required value={description}
                                onChange={handleInputChange} />



                            <div className='w-full flex flex-row mb-8'>
                                <div className='w-full'></div>
                                <button type='submit' className='w-24 ml-8 bg-white border border-blue-500 px-4 py-2 rounded rounded-lg hover:bg-blue-500 hover:text-white  '>Ajouter</button>

                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ModalComponent;