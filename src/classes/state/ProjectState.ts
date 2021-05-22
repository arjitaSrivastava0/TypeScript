import {Project, ProjectStatus} from "../models/Project";


//Project State Management
type Listener<T> = (items: T[]) => void ;

class State<T> {
    protected listeners: Listener<T>[] = [];//array of functions references

    addListener(listenerFn: Listener<T>) {
        //
        this.listeners.push(listenerFn);
    }
    
}

export class ProjectState extends State<Project>{
    private projects: Project[] = [];
    private static instance: ProjectState;

    private constructor() {
        super();
    }

    static getInstance() {
        if(this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;
    }
    addProject(title: string, description: string, noOfPeople: number) {
        const newProject = new Project(
            Math.random().toString(),
            title, description, noOfPeople, 
            ProjectStatus.Active
        );
        this.projects.push(newProject);
        this.updateListeners();
        console.log(this.projects); 
    }

    moveProject(projectId: string, newStatus: ProjectStatus) {
        const project = this.projects.find(prj => prj.id === projectId);
        if(project && project.status !== newStatus)  {
            project.status = newStatus;
            this.updateListeners();
        }
        
    }

    private updateListeners() {
        for(const listenerFn of this.listeners) {
            listenerFn(this.projects.slice());//to have copy of that array
        }
    }
}
//global constant
export const projectState = ProjectState.getInstance();
