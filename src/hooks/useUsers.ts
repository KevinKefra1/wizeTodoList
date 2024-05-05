import { User, UserState } from './../model';
import { useState, useEffect } from 'react';
import axios from 'axios';

export const useUsers= (): UserState => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                const response = await axios.get('/users');
                const data = response.data;
                setUsers(data["users"]);
                setLoading(false);
            } catch (err: any) {
                console.log(err)
                setError(err.message);
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);


    const addUser = async (newUser: User) => {
        setLoading(true);
        try {
            const response = await axios.post('/users', newUser);
            //   setUsers([...tasks, response.data]);
            setUsers(response.data)
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    const deleteUser = async (oldUser: User) => {
        setLoading(true);
        try {
            const response=    await axios.delete(`/users/${oldUser.id}` );
            //   setUsers([...tasks, response.data]);
            setUsers(response.data)
          
        } catch (err: any) {
            console.log(err)
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };


    return { users, loading, error, addUser, deleteUser };
};
