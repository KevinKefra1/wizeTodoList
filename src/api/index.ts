import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { User, Task } from "../model";
import { listAssignes, listTasks } from "./data";

const api = new MockAdapter(axios);
let users:User[] = [...listAssignes];
let tasks = [...listTasks];

function updateTasks(newTask: Task) {
  const existingTaskIndex = tasks.findIndex((task) => task.id === newTask.id);

  if (existingTaskIndex !== -1) {
    const updatedTasks = [...tasks];
    updatedTasks[existingTaskIndex] = newTask;
    tasks = updatedTasks;
  } else {
    tasks = [...tasks, newTask];
  }
}

function updateUsers(newUser: User) {
  const existingTaskIndex = users.findIndex(
    (user) => user.name === newUser.name
  );

  if (existingTaskIndex !== -1) {
    const updatedUsers = [...users];
    updatedUsers[existingTaskIndex] = newUser;
    users = updatedUsers;
  } else {
    users = [...users, newUser];
  }
}

function deleteTask(taskId: number) {
  tasks = tasks.filter((task) => task.id !== taskId);
}

function deleteUser(userId: number) {
  users = users.filter((user) => user.id !== userId);
}


api.onGet("/users").reply((config: any) =>{
    console.log(users)
    return [200, {
        users: [...users],
      }];
});

api.onGet("/tasks").reply((config: any) => {
  return [
    200,
    {
      tasks: [...tasks],
      users: [...users],
    },
  ];
});

api.onPost("/tasks").reply((config: any) => {
  const newTask = JSON.parse(config.data);
  updateTasks(newTask);
  return [200, tasks];
});

api.onPost("/users").reply((config: any) => {
  const newUser: User = JSON.parse(config.data);
  updateUsers(newUser);
  return [200, users];
});

api.onDelete(/\/tasks\/(.+)/).reply((config: any) => {
  const taskId = parseInt(config.url.split("/").pop()!);

  deleteTask(taskId);
  return [200, tasks];
});

api.onDelete(/\/users\/(.+)/).reply((config: any) => {
  const userId = parseInt(config.url.split("/").pop()!);
  deleteUser(userId);
  return [200, users];
});

export default api;
