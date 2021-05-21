
import {Project} from "../models/Project.js";
import { Draggable } from "../models/DragDrop.js";
import {autoBind} from "../decorators/AutobindDecorator.js";
import {Component} from "../components/Component.js";

// namespace App {
    //ProjectItem class
    export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable{
        private project: Project;
    
        get persons() {
            if(this.project.people === 1) {
                return "1 person";
            } else {
                return `${this.project.people} persons`;
            }
        }
        
        constructor(hostId: string, project: Project) {
            super("single-project", hostId, false, project.id);
            this.project = project;
            this.configure();
            this.renderContent();
        }
    
        @autoBind
        dragStartHandler(event: DragEvent) {
            event.dataTransfer!.setData("text/plain", this.project.id);
            event.dataTransfer!.effectAllowed = "move";//remove it from original place and move it to dragged place
    
        }
    
        dragEndHandler(event: DragEvent) {
            console.log("drag End");
        }
    
        configure() {
            //this keyword referes to class 
            this.element.addEventListener("dragstart", this.dragStartHandler);
            this.element.addEventListener("dragend", this.dragEndHandler);
    
        }
        renderContent() {
            this.element.querySelector("h2")!.textContent = this.project.title;
            this.element.querySelector("h3")!.textContent = this.persons+ " assigned";
            this.element.querySelector("p")!.textContent = this.project.description;
        }
    }
    
// }