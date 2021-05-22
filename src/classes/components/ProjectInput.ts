import { Component } from "../components/Component";
import { Validatable,validate } from "../util/Validation";
import { autoBind } from "../decorators/AutobindDecorator";
import { projectState } from "../state/ProjectState";

//projectInput class
export class ProjectInput extends Component<HTMLDivElement, HTMLElement>{
    titleInputElement:  HTMLInputElement;
    descriptionInputElement:  HTMLInputElement;
    peopleInputElement:  HTMLInputElement;


    constructor() {
        super("project-input", "app", true, "user-input");//giving insertbefore as true because we wanna insert that newly created element at the beginning
        this.titleInputElement = this.element.querySelector("#title") as HTMLInputElement;
        this.descriptionInputElement = this.element.querySelector("#description") as HTMLInputElement;
        this.peopleInputElement = this.element.querySelector("#people") as HTMLInputElement;

        this.configure();
    }

    configure() {
        this.element.addEventListener("submit", this.submitHandler);
    }
    renderContent() {}
    //tuple
    private gatheredUserInput(): [string, string, number] | void{
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredPeople = this.peopleInputElement.value;

        const titleValidatable: Validatable = {
            value: enteredTitle,
            required: true
        };
        const descriptionValidatable: Validatable = {
            value: enteredDescription,
            required: true,
            minLength: 5
        };
        const peopleValidatable: Validatable = {
            value: +enteredPeople,
            required: true,
            min: 1,
            max: 5
        };
    
        //validation of user input
        if(!validate(titleValidatable) ||  !validate(descriptionValidatable) || !validate(peopleValidatable)) {
            alert("Invalid input, please try again!! ");
            return;
        } else {
            return [enteredTitle, enteredDescription, +enteredPeople];
        }
    }

    private clearInputs() {
        this.titleInputElement.value ="";
        this.descriptionInputElement.value = "";
        this.peopleInputElement.value = "";
    }

    @autoBind
    private submitHandler(event: Event) {
        event.preventDefault();
        const userInput = this.gatheredUserInput();//userInput will have the arra of three values 
        if(Array.isArray(userInput)) {
            const [title, desc, people] = userInput;
            projectState.addProject(title, desc, people);
            console.log(title, desc, people);
            this.clearInputs();
        }  
    }
}
