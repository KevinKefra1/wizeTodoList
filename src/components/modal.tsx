import React, { useState } from 'react';
import { Label, PriorityOfTask, Task } from '../model';



interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddTask: (task: Task) => void;
}

const ModalComponent: React.FC<ModalProps> = ({ isOpen, onClose, onAddTask }) => {

    const handleAddTask = () => {
        const newTask: Task = {
            id: Math.floor(Math.random() * 1000) + 1,
            title: "Tâche 1",
            assignee: { id: 1, name: "kevin kefra", email: "kefra@example.com", phone: "+1234567890" },
            startDate: new Date(2024, 4, 1),
            endDate: new Date(2024, 4, 30),
            priority: PriorityOfTask.MEDIUM,
            labels: [Label.HTML],
            description: "Description de la tâche 1"
        };
        onAddTask(newTask);
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div>
            <div >
                <h2>Ajouter une tâche</h2>
                <button onClick={handleAddTask}>Ajouter</button>
                <button onClick={onClose}>Cancer</button>
            </div>
        </div>
    );
};

export default ModalComponent;