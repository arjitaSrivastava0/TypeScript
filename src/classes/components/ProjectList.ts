
import {Component} from "../components/Component.js";
import {autoBind} from "../decorators/AutobindDecorator.js";
import { DragTarget } from "../models/DragDrop.js";
import {Project, ProjectStatus} from "../models/Project.js";
import {projectState} from "../state/ProjectState.js";
import {ProjectItem} from "../components/ProjectItems.js";


export class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget{
    assignedProjects: Project[] = [];

    constructor(private type: "active" | "finished") {
        super('project-list', 'app', false ,`${type}-projects`);
        this.assignedProjects = [];
        //adding the projects to assignedprojects 
        this.configure();//listener 
        this.renderContent();
    }
    @autoBind //to make sure this keyword is bound to surrounding class 
    dragOverHandler(event: DragEvent) {
        if(event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
            event.preventDefault();
            const listEl = this.element.querySelector("ul")!;
            listEl.classList.add("droppable");//class droppable 
        }

    }
    @autoBind 
    dropHandler(event: DragEvent) {
        const prjId = event.dataTransfer!.getData("text/plain")
        projectState.moveProject(prjId, this.type === "active" ? ProjectStatus.Active : ProjectStatus.Finished);
        
    }
    @autoBind
    dragLeaveHandler(event: DragEvent) {
        const listEl = this.element.querySelector("ul")!;
        listEl.classList.remove("droppable");
    }

    configure() {
        this.element.addEventListener("dragover", this.dragOverHandler);
        this.element.addEventListener("dragleave", this.dragLeaveHandler);
        this.element.addEventListener("drop", this.dropHandler);


        projectState.addListener((projects: Project[]) => {
            //filter the projects, when this function returns true we keep the item
            //which is then stored in releventProjects, nbut if returns fals then we drop the item 
            //not from the original list but from the new list which is stored in releventProjects

            const relevantProjects = projects.filter(prj => {
                if(this.type === "active") {
                    return prj.status === ProjectStatus.Active;
                }
                return prj.status === ProjectStatus.Finished;
            });
            this.assignedProjects = relevantProjects;
            this.renderProjects();//to list all the projects that has been added to the UL
        });   
    }

    renderContent() {
        const listId = `${this.type}-projects-list`; 
        this.element.querySelector("ul")!.id = listId;
        this.element.querySelector("h2")!.textContent = this.type.toUpperCase() + " Projects "; 
    }

    private renderProjects() {
        const listEl = document.getElementById(`${this.type}-projects-list`)! as HTMLUListElement;
        listEl.innerHTML = "";// to stop duplication of project in list
        for( const prjItem of this.assignedProjects) {
            new ProjectItem(this.element.querySelector("ul")!.id, prjItem );
        }
    }
}
