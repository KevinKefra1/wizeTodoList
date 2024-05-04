import { useState, useEffect } from 'react';
import { Task } from '../model';
import axios from 'axios';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/tasks');
        const data = response.data;
        setTasks(data);
        setLoading(false);
      } catch (err:any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  return { tasks, loading, error };
};
