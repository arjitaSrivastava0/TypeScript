var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define("classes/components/Component", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Component = void 0;
    //component base class does all the general rendering but 
    //then the 
    //abstract class, can't be instantiated
    class Component {
        constructor(templateId, hostId, insertAtStart, newElementId) {
            this.templateElement = document.getElementById(templateId);
            this.hostElement = document.getElementById(hostId);
            const importedNode = document.importNode(this.templateElement.content, true);
            this.element = importedNode.firstElementChild;
            if (newElementId) {
                this.element.id = newElementId;
            }
            this.attach(insertAtStart);
        }
        attach(insertAtBeginning) {
            //render the list to dom
            this.hostElement.insertAdjacentElement(insertAtBeginning ? "afterbegin" : "beforeend", this.element);
        }
    }
    exports.Component = Component;
});
define("classes/util/Validation", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.validate = void 0;
    function validate(validatableInput) {
        let isValid = true;
        if (validatableInput.required) {
            //if length is not zero then 2nds condition will return true
            //if it is zero then false
            isValid = isValid && validatableInput.value.toString().trim().length !== 0;
        }
        if (validatableInput.minLength != null && typeof validatableInput.value === "string") {
            isValid = isValid && validatableInput.value.length >= validatableInput.minLength;
        }
        if (validatableInput.maxLength != null && typeof validatableInput.value === "string") {
            isValid = isValid && validatableInput.value.length <= validatableInput.maxLength;
        }
        if (validatableInput.min != null && typeof validatableInput.value === "number") {
            isValid = isValid && validatableInput.value >= validatableInput.min;
        }
        if (validatableInput.max != null && typeof validatableInput.value === "number") {
            isValid = isValid && validatableInput.value <= validatableInput.max;
        }
        return isValid;
    }
    exports.validate = validate;
});
define("classes/decorators/AutobindDecorator", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.autoBind = void 0;
    //auto bind decorator
    function autoBind(target, methodName, descriptor) {
        const originalMethod = descriptor.value;
        const adjDescriptor = {
            configurable: true,
            get() {
                const boundFn = originalMethod.bind(this);
                return boundFn;
            }
        };
        return adjDescriptor;
    }
    exports.autoBind = autoBind;
});
define("classes/models/Project", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Project = exports.ProjectStatus = void 0;
    //Project type
    var ProjectStatus;
    (function (ProjectStatus) {
        ProjectStatus[ProjectStatus["Active"] = 0] = "Active";
        ProjectStatus[ProjectStatus["Finished"] = 1] = "Finished";
    })(ProjectStatus = exports.ProjectStatus || (exports.ProjectStatus = {}));
    class Project {
        constructor(id, title, description, people, status) {
            this.id = id;
            this.title = title;
            this.description = description;
            this.people = people;
            this.status = status;
        }
    }
    exports.Project = Project;
});
define("classes/state/ProjectState", ["require", "exports", "classes/models/Project"], function (require, exports, Project_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.projectState = exports.ProjectState = void 0;
    class State {
        constructor() {
            this.listeners = []; //array of functions references
        }
        addListener(listenerFn) {
            //
            this.listeners.push(listenerFn);
        }
    }
    class ProjectState extends State {
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
            const newProject = new Project_js_1.Project(Math.random().toString(), title, description, noOfPeople, Project_js_1.ProjectStatus.Active);
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
    exports.ProjectState = ProjectState;
    //global constant
    exports.projectState = ProjectState.getInstance();
});
define("classes/components/ProjectInput", ["require", "exports", "classes/components/Component", "classes/util/Validation", "classes/decorators/AutobindDecorator", "classes/state/ProjectState"], function (require, exports, Component_js_1, Validation_js_1, AutobindDecorator_js_1, ProjectState_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ProjectInput = void 0;
    //projectInput class
    class ProjectInput extends Component_js_1.Component {
        constructor() {
            super("project-input", "app", true, "user-input"); //giving insertbefore as true because we wanna insert that newly created element at the beginning
            this.titleInputElement = this.element.querySelector("#title");
            this.descriptionInputElement = this.element.querySelector("#description");
            this.peopleInputElement = this.element.querySelector("#people");
            this.configure();
        }
        configure() {
            this.element.addEventListener("submit", this.submitHandler);
        }
        renderContent() { }
        //tuple
        gatheredUserInput() {
            const enteredTitle = this.titleInputElement.value;
            const enteredDescription = this.descriptionInputElement.value;
            const enteredPeople = this.peopleInputElement.value;
            const titleValidatable = {
                value: enteredTitle,
                required: true
            };
            const descriptionValidatable = {
                value: enteredDescription,
                required: true,
                minLength: 5
            };
            const peopleValidatable = {
                value: +enteredPeople,
                required: true,
                min: 1,
                max: 5
            };
            //validation of user input
            if ((0, Validation_js_1.validate)(titleValidatable) && (0, Validation_js_1.validate)(descriptionValidatable) && (0, Validation_js_1.validate)(peopleValidatable)) {
                alert("Invalid input, please try again!! ");
                return;
            }
            else {
                return [enteredTitle, enteredDescription, +enteredPeople];
            }
        }
        clearInputs() {
            this.titleInputElement.value = "";
            this.descriptionInputElement.value = "";
            this.peopleInputElement.value = "";
        }
        submitHandler(event) {
            event.preventDefault();
            const userInput = this.gatheredUserInput(); //userInput will have the arra of three values 
            if (Array.isArray(userInput)) {
                const [title, desc, people] = userInput;
                ProjectState_js_1.projectState.addProject(title, desc, people);
                console.log(title, desc, people);
                this.clearInputs();
            }
        }
    }
    __decorate([
        AutobindDecorator_js_1.autoBind
    ], ProjectInput.prototype, "submitHandler", null);
    exports.ProjectInput = ProjectInput;
});
define("classes/models/DragDrop", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
// }
define("classes/components/ProjectItems", ["require", "exports", "classes/decorators/AutobindDecorator", "classes/components/Component"], function (require, exports, AutobindDecorator_js_2, Component_js_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ProjectItem = void 0;
    // namespace App {
    //ProjectItem class
    class ProjectItem extends Component_js_2.Component {
        constructor(hostId, project) {
            super("single-project", hostId, false, project.id);
            this.project = project;
            this.configure();
            this.renderContent();
        }
        get persons() {
            if (this.project.people === 1) {
                return "1 person";
            }
            else {
                return `${this.project.people} persons`;
            }
        }
        dragStartHandler(event) {
            event.dataTransfer.setData("text/plain", this.project.id);
            event.dataTransfer.effectAllowed = "move"; //remove it from original place and move it to dragged place
        }
        dragEndHandler(event) {
            console.log("drag End");
        }
        configure() {
            //this keyword referes to class 
            this.element.addEventListener("dragstart", this.dragStartHandler);
            this.element.addEventListener("dragend", this.dragEndHandler);
        }
        renderContent() {
            this.element.querySelector("h2").textContent = this.project.title;
            this.element.querySelector("h3").textContent = this.persons + " assigned";
            this.element.querySelector("p").textContent = this.project.description;
        }
    }
    __decorate([
        AutobindDecorator_js_2.autoBind
    ], ProjectItem.prototype, "dragStartHandler", null);
    exports.ProjectItem = ProjectItem;
});
// }
define("classes/components/ProjectList", ["require", "exports", "classes/components/Component", "classes/decorators/AutobindDecorator", "classes/models/Project", "classes/state/ProjectState", "classes/components/ProjectItems"], function (require, exports, Component_js_3, AutobindDecorator_js_3, Project_js_2, ProjectState_js_2, ProjectItems_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ProjectList = void 0;
    class ProjectList extends Component_js_3.Component {
        constructor(type) {
            super('project-list', 'app', false, `${type}-projects`);
            this.type = type;
            this.assignedProjects = [];
            this.assignedProjects = [];
            //adding the projects to assignedprojects 
            this.configure(); //listener 
            this.renderContent();
        }
        dragOverHandler(event) {
            if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
                event.preventDefault();
                const listEl = this.element.querySelector("ul");
                listEl.classList.add("droppable"); //class droppable 
            }
        }
        dropHandler(event) {
            const prjId = event.dataTransfer.getData("text/plain");
            ProjectState_js_2.projectState.moveProject(prjId, this.type === "active" ? Project_js_2.ProjectStatus.Active : Project_js_2.ProjectStatus.Finished);
        }
        dragLeaveHandler(event) {
            const listEl = this.element.querySelector("ul");
            listEl.classList.remove("droppable");
        }
        configure() {
            this.element.addEventListener("dragover", this.dragOverHandler);
            this.element.addEventListener("dragleave", this.dragLeaveHandler);
            this.element.addEventListener("drop", this.dropHandler);
            ProjectState_js_2.projectState.addListener((projects) => {
                //filter the projects, when this function returns true we keep the item
                //which is then stored in releventProjects, nbut if returns fals then we drop the item 
                //not from the original list but from the new list which is stored in releventProjects
                const relevantProjects = projects.filter(prj => {
                    if (this.type === "active") {
                        return prj.status === Project_js_2.ProjectStatus.Active;
                    }
                    return prj.status === Project_js_2.ProjectStatus.Finished;
                });
                this.assignedProjects = relevantProjects;
                this.renderProjects(); //to list all the projects that has been added to the UL
            });
        }
        renderContent() {
            const listId = `${this.type}-projects-list`;
            this.element.querySelector("ul").id = listId;
            this.element.querySelector("h2").textContent = this.type.toUpperCase() + " Projects ";
        }
        renderProjects() {
            const listEl = document.getElementById(`${this.type}-projects-list`);
            listEl.innerHTML = ""; // to stop duplication of project in list
            for (const prjItem of this.assignedProjects) {
                new ProjectItems_js_1.ProjectItem(this.element.querySelector("ul").id, prjItem);
            }
        }
    }
    __decorate([
        AutobindDecorator_js_3.autoBind //to make sure this keyword is bound to surrounding class 
    ], ProjectList.prototype, "dragOverHandler", null);
    __decorate([
        AutobindDecorator_js_3.autoBind
    ], ProjectList.prototype, "dropHandler", null);
    __decorate([
        AutobindDecorator_js_3.autoBind
    ], ProjectList.prototype, "dragLeaveHandler", null);
    exports.ProjectList = ProjectList;
});
define("classes/app", ["require", "exports", "classes/components/ProjectInput", "classes/components/ProjectList"], function (require, exports, ProjectInput_js_1, ProjectList_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var App;
    (function (App) {
        new ProjectInput_js_1.ProjectInput();
        new ProjectList_js_1.ProjectList("active");
        new ProjectList_js_1.ProjectList("finished");
    })(App || (App = {}));
});
//# sourceMappingURL=bundle.js.map