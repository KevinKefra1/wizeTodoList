import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { Task } from "../model";
import { listAssignes, listTasks } from "./data";

const api = new MockAdapter(axios);
let users = [...listAssignes];
let tasks = [...listTasks];
api.onGet("/users").reply(200, {
  users: users,
});

api.onGet("/tasks").reply(200, {
  tasks: tasks,
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

api.onDelete(/\/tasks\/(.+)/).reply((config:any) => {
    const taskId = parseInt(config.url.split('/').pop()!);
    tasks = tasks.filter((task) => task.id !== taskId);
    
    return [200,tasks];
  });


export default api;
