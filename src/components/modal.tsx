import React, { useState } from 'react';
import { listAssignes } from '../api/data';
import {  Label, PriorityOfTask, Task } from '../model';



interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddTask: (task: Task) => void;
}

const ModalComponent: React.FC<ModalProps> = ({ isOpen, onClose, onAddTask }) => {
    const [formData, setFormData] = useState({ title: "", description: "", startDate: new Date(), endDate: new Date(), labels: [Label.CSS], assignee: listAssignes[0], priority: PriorityOfTask.HIGH, });
    const [isValidTitle, setIsValidTitle] = useState(false);
    const { title, description, startDate, labels, priority, assignee } = formData;

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

    const handleLabelChange = (event: any) => {

        console.log(event.target.value);
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
                id: Math.floor(Math.random() * 1000) + 1,
                title: formData.title,
                assignee: assignee,
                startDate: startDate,
                endDate: undefined,
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
        <div>
            <form onSubmit={handleAddTask} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div style={{ display: "flex", flexDirection: "row", gap: "20px" }} ><h2>Add new task</h2> <span className="close" onClick={onClose}>&times;</span> </div>
                <input type="text" name="title" placeholder='Task Title' required value={title}
                    onChange={handleInputChange} />
                <textarea name="description" placeholder='Description' required value={description}
                    onChange={handleInputChange} />
                <input type="date" name="startDate" value={startDate.toISOString().substring(0, 10)} onChange={handleDateChange} />
                <select
                    value={priority}
                    onChange={e => handlePriorityChange(e.target.value)}
                >
                    <option value={PriorityOfTask.LOW}>Low</option>
                    <option value={PriorityOfTask.MEDIUM}>Meidum</option>
                    <option value={PriorityOfTask.HIGH}>High</option>
                </select>


                <select
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
                <select multiple value={labels[0]} onChange={handleLabelChange}>
                    {Object.values(Label).map((label) => (
                        <option key={label} value={label}>
                            {label}
                        </option>
                    ))}
                </select>



                <button type='submit'>Ajouter</button>
            </form>

        </div>
    );
};

export default ModalComponent;