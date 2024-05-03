export enum PriorityOfTask {
    LOW="LOW",
    MEDIUM="MEDIUM",
    HIGH="HIGH"
}

export enum Label {
    HTML = "HTML",
    CSS = "CSS",
    PYTHON = "PYTHON",
    REACT = "REACT",
    NEXT = "NEXT",
}


export interface Menu {
    id: number;
    name: string;
    icon: any;
}
export interface LabelMenu {
    color: string;
    name: string;
}


