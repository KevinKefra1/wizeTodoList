import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { Task } from '../model';
import { listAssignes, listTasks } from './data';

const api = new MockAdapter(axios);
let users = [...listAssignes];
let tasks = [...listTasks]
api.onGet('/users').reply(200, {
    users: users
});

api.onGet('/tasks').reply(200, {
    tasks: tasks
});


api.onGet('/tasks/:id').reply((config: any) => {
    const taskId = parseInt(config.url?.match(/\/tasks\/(.+)/)?.[1] || '', 10);
    const task = tasks.find((task) => task.id === taskId);
  
    if (task) {
      return [200, task];
    }
  
    return [404, { message: 'Tâche non trouvée' }];
  });


export default api;