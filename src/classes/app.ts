//uncomment experimentalDecorators: true in tsconfig file.
//adding decorators here

//A Decorator is a special kind of declaration that can be attached to a class declaration, method, 
//accessor, property, or parameter. Decorators use the form @expression, where expression must
// evaluate to a function that will be called at runtime with information about the decorated declaration.

//@ is a special type of identifier which typescript recognizes
//our decorator output (Logging and constructor) is printed
//first before we see person object 

//Decorators execute when the class is defined not when it's instantiated
//Decorators run when js finds the class definition not when we use that
//constructor functon to instantiate an object

//decorator factories
//allows us to pass in extra config which we need here
//
function Logger(logString: string) {
    return function(constructor: Function) {
        console.log(logString);
        console.log(constructor);
    }
}

function WithTemplate(template: string, hookId: string) {
    return function<T extends  {new (...args: any[]): {name: string}}>(originalConstructor: T) {
        return class extends originalConstructor {
            constructor(..._: any[]) {
                super();
                console.log("Renderring function...");
            
                const hookEl = document.getElementById(hookId);
                if(hookEl) {
                    hookEl.innerHTML = template;
                    //! mark, 'we;re assuming that we'll always find an h1 element
                    hookEl.querySelector('h1')!.textContent = this.name;
                }
            }
        };
    }
}

//multiple decorator and it'll execute from bottom to up order
//which means withtemplate decorator will execute first then logger decorator
@Logger('Logging... Person')

@WithTemplate("<h1>Hi we're here</h1> ", "app")
class Person {
    name = 'Arjita';
    constructor() {
        console.log('Creating person object...'); 
    }
}

const pers = new Person();
console.log(pers);




//property decorator
function Log(target: any, propertyName: string) {
    console.log("Property Decorator");
    console.log(target);
    console.log(propertyName);
}

//accessor decorator
function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
    console.log("Accessor decorator");
    console.log(target);
    console.log(name);
    console.log(descriptor);
}

//method decorator
function Log3(target: any, name: string, descriptor: PropertyDecorator)  {
    console.log("Method decorator");
    console.log(target);
    console.log(name);
    console.log(descriptor);
}

//parameter decorator
function Log4(target: any, name: string, position: number) {
    console.log("parameter decorator");
    console.log(target);
    console.log(name);
    console.log(position);
}

//when does this logger execute this Property Decorator console
//when out class definition is registered by javascript
//

class Product {
    @Log
    title: string;
    private _price: number;

    @Log2
    //accessor
    set price(val: number) {
        if(val > 0) {
            this._price = val;
        } else{
            throw new Error("Invalid price");
        }
    }


    constructor(t: string, p: number) {
        this.title = t;
        this._price = p;
    }

    // @Log3
    getPriceWithTax(@Log4 tax: number) {
        return this._price * (1 +tax);
    }
}

function AutoBind(target: any, methodName: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor ={
        configurable: true,
        enumerable: false,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    };
    return adjDescriptor;
}

class Printer {
    message = "This works!" ;

    @AutoBind
    showMessage() {
        console.log(this.message);
    }
}

const p = new Printer();

const button = document.querySelector("button")!;
// button.addEventListener("click", p.showMessage.bind(p));
button.addEventListener("click", p.showMessage);

//validation with decorators

interface ValidatorConfig {
    [property: string]: {
        [validatableProp: string]: string[]
    }
}

const registeredValidators: ValidatorConfig = {};

function Required(target: any, propertyName: string) {
    registeredValidators[target.constructor.name] = {
        [propertyName] :["required"]
    }
}

function PositiveNumber(target: any, propertyName: string) {
    registeredValidators[target.constructor.name] = {
        [propertyName] :["positive"]
    }
}

function validate(obj: any) {
    const objValidatorConfig = registeredValidators[obj.constructor.name];
    if(!objValidatorConfig) {
        return true;
    }
    let isValid = true;
    for(const prop in objValidatorConfig) {
        for( const validator of objValidatorConfig[prop]) {
            switch (validator) {
                case "required":
                    isValid = isValid && !!obj[prop];
                    break;
                case "positive":
                    isValid = isValid && obj[prop] > 0;
                    break;
            }
        }
    }
    return isValid;
}

class Course {
    @Required
    title: string;
    @PositiveNumber
    price: number;

    constructor(t: string, p: number) { 
        this.title = t;
        this.price = p;
    }
}

const courseForm = document.querySelector("form");
courseForm?.addEventListener("submit", event => {
    event.preventDefault();
    const titleEl = document.getElementById("title") as HTMLInputElement;
    const priceEl = document.getElementById("price") as HTMLInputElement;
    const title = titleEl.value;
    const price = +priceEl.value;

    const createdCourse = new Course(title, price);
    if(!validate(createdCourse)) {
        console.log("invalid input");
        
    }
    console.log(createdCourse);
    

});
