import { useState, useEffect } from 'react';
import { LoadTaskState, Task } from '../model';
import axios from 'axios';

export const useTasks = (): LoadTaskState => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                setLoading(true);
                const response = await axios.get('/tasks');
                const data = response.data;
                setTasks(data["tasks"]);
                setLoading(false);
            } catch (err: any) {
                console.log(err)
                setError(err.message);
                setLoading(false);
            }
        };

        fetchTasks();
    }, []);


    const addTask = async (newTask: Task) => {
        setLoading(true);
        try {
            const response = await axios.post('/tasks', newTask);
            //   setTasks([...tasks, response.data]);
            setTasks(response.data)
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    const deleteTask = async (oldTask: Task) => {
        setLoading(true);
        try {
            const response=    await axios.delete(`/tasks/${oldTask.id}` );
            //   setTasks([...tasks, response.data]);
            setTasks(response.data)
          
        } catch (err: any) {
            console.log(err)
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };


    return { tasks, loading, error, addTask, deleteTask };
};
