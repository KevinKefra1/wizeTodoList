export interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
}

export interface UserState {
    users: User[];
    loading: boolean;
    error: string | null;
    addUser: (user: User) => void;
    deleteUser: (user: User) => void;
}
