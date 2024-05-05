import { User, Label, LabelMenu, Menu, PriorityOfTask, Task } from "../model";
import {
    faCalendarMinus,
    faClock,
    faDotCircle,
    faRadiation,
    faUserFriends,
} from "@fortawesome/free-solid-svg-icons";




export const listAssignes: User[] = [
    { id: 1, name: "kevin kefra", email: "kefra@example.com", phone: "+23765998555x" },
    { id: 2, name: " kefra", email: "kefra2@example.com", phone: "+237655444444" },
    { id: 3, name: "kevin_kefra", email: "kefra3@example.com", phone: "+237666555440" }
];

export const listTasks: Task[] = [{
    id: 1,
    title: "Tâche 1",
    assignee: listAssignes[2],
    startDate: new Date(2024, 4, 1),
    endDate: new Date(2024, 4, 30),
    priority: PriorityOfTask.MEDIUM,
    labels: [Label.HTML],
    description: "Description de la tâche 1"
}, {
    id: 2,
    title: "Tâche 2",
    assignee: listAssignes[1],
    startDate: new Date(2024, 4, 1),
    endDate: new Date(2024, 4, 30),
    priority: PriorityOfTask.HIGH,
    labels: [Label.HTML, Label.CSS],
    description: "Description de la tâche 1"
}, {
    id: 3,
    title: "Tâche 3",
    assignee: listAssignes[0],
    startDate: new Date(2024, 4, 1),
    endDate: new Date(2024, 4, 30),
    priority: PriorityOfTask.LOW,
    labels: [Label.NEXT],
    description: "Description de la tâche 1"
},]


export const listMenuLabel: LabelMenu[] = [
    {
        color: "red",
        name: Label.HTML.toString()
    }, {
        color: "yellow",
        name: Label.CSS.toString()
    }, {
        color: "blue",
        name: Label.REACT.toString()
    }, {
        color: "Black",
        name: Label.NEXT.toString()
    }, {
        color: "green",
        name: Label.PYTHON.toString()
    },
]

export const listMenu: Menu[] = [
    {
        id: 1,
        name: "All",
        icon: faUserFriends,
    },
    {
        id: 2,
        name: "Priority",
        icon: faRadiation,
    },
    {
        id: 3,
        name: "Today",
        icon: faCalendarMinus,
    },
    {
        id: 4,
        name: "Completed",
        icon: faClock,
    },
];
