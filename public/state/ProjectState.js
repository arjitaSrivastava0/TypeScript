import { Project, ProjectStatus } from "../models/Project.js";
class State {
    constructor() {
        this.listeners = []; //array of functions references
    }
    addListener(listenerFn) {
        //
        this.listeners.push(listenerFn);
    }
}
export class ProjectState extends State {
    constructor() {
        super();
        this.projects = [];
    }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;
    }
    addProject(title, description, noOfPeople) {
        const newProject = new Project(Math.random().toString(), title, description, noOfPeople, ProjectStatus.Active);
        this.projects.push(newProject);
        this.updateListeners();
        console.log(this.projects);
    }
    moveProject(projectId, newStatus) {
        const project = this.projects.find(prj => prj.id === projectId);
        if (project && project.status !== newStatus) {
            project.status = newStatus;
            this.updateListeners();
        }
    }
    updateListeners() {
        for (const listenerFn of this.listeners) {
            listenerFn(this.projects.slice()); //to have copy of that array
        }
    }
}
//global constant
export const projectState = ProjectState.getInstance();
//# sourceMappingURL=ProjectState.js.map