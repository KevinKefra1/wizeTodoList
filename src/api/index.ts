import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { Assignee, Task } from "../model";
import { listAssignes, listTasks } from "./data";

const api = new MockAdapter(axios);
let users = [...listAssignes];
let tasks = [...listTasks];
api.onGet("/users").reply(200, {
  users: [...users],
});

api.onGet("/tasks").reply((config: any) =>{
    console.log(users);
    console.log(tasks);
    return [200, {
        tasks: [...tasks],
        users: [...users],
      }];
});

api.onPost("/tasks").reply((config: any) => {
  const newTask = JSON.parse(config.data);
  const existingTaskIndex = tasks.findIndex((task) => task.id === newTask.id);

  if (existingTaskIndex !== -1) {
    const updatedTasks = [...tasks];
    updatedTasks[existingTaskIndex] = newTask;
    tasks = updatedTasks;
  } else {
    tasks = [...tasks, newTask];
  }
  return [200, tasks];
});

api.onPost("/users").reply((config: any) => {
    const newUser:Assignee = JSON.parse(config.data);

    console.log(users)
    const existingTaskIndex = users.findIndex((user) => user.name === newUser.name);
  
    if (existingTaskIndex !== -1) {
      const updatedUsers = [...users];
      updatedUsers[existingTaskIndex] = newUser;
      users = updatedUsers;
    } else {
      users = [...users, newUser];
    }
    return [200, users];
  });

api.onDelete(/\/tasks\/(.+)/).reply((config:any) => {
    const taskId = parseInt(config.url.split('/').pop()!);
    tasks = tasks.filter((task) => task.id !== taskId);
    
    return [200,tasks];
  });

  api.onDelete(/\/users\/(.+)/).reply((config:any) => {
    const userId = parseInt(config.url.split('/').pop()!);
    users = users.filter((user) => user.id !== userId);
    
    return [200,users];
  });

export default api;
