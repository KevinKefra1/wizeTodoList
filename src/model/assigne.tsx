export  interface Assignee {
    id: number;
    name: string;
    email: string;
    phone: string;
}

export interface UserState {
    users:Assignee[];
    loading: boolean;
    error: string | null;
    addUser: (user:Assignee) => void;
    deleteUser: (user:Assignee) => void;
}
