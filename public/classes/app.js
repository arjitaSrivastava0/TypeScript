"use strict";
//uncomment experimentalDecorators: true in tsconfig file.
//adding decorators here
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
function Logger(logString) {
    return function (constructor) {
        console.log(logString);
        console.log(constructor);
    };
}
function WithTemplate(template, hookId) {
    return function (originalConstructor) {
        return class extends originalConstructor {
            constructor(..._) {
                super();
                console.log("Renderring function...");
                const hookEl = document.getElementById(hookId);
                if (hookEl) {
                    hookEl.innerHTML = template;
                    //! mark, 'we;re assuming that we'll always find an h1 element
                    hookEl.querySelector('h1').textContent = this.name;
                }
            }
        };
    };
}
//multiple decorator and it'll execute from bottom to up order
//which means withtemplate decorator will execute first then logger decorator
let Person = class Person {
    constructor() {
        this.name = 'Arjita';
        console.log('Creating person object...');
    }
};
Person = __decorate([
    Logger('Logging... Person'),
    WithTemplate("<h1>Hi we're here</h1> ", "app")
], Person);
const pers = new Person();
console.log(pers);
//property decorator
function Log(target, propertyName) {
    console.log("Property Decorator");
    console.log(target);
    console.log(propertyName);
}
//accessor decorator
function Log2(target, name, descriptor) {
    console.log("Accessor decorator");
    console.log(target);
    console.log(name);
    console.log(descriptor);
}
//method decorator
function Log3(target, name, descriptor) {
    console.log("Method decorator");
    console.log(target);
    console.log(name);
    console.log(descriptor);
}
//parameter decorator
function Log4(target, name, position) {
    console.log("parameter decorator");
    console.log(target);
    console.log(name);
    console.log(position);
}
//when does this logger execute this Property Decorator console
//when out class definition is registered by javascript
//
class Product {
    constructor(t, p) {
        this.title = t;
        this._price = p;
    }
    set price(val) {
        if (val > 0) {
            this._price = val;
        }
        else {
            throw new Error("Invalid price");
        }
    }
    // @Log3
    getPriceWithTax(tax) {
        return this._price * (1 + tax);
    }
}
__decorate([
    Log
], Product.prototype, "title", void 0);
__decorate([
    Log2
], Product.prototype, "price", null);
__decorate([
    __param(0, Log4)
], Product.prototype, "getPriceWithTax", null);
function AutoBind(target, methodName, descriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor = {
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
    constructor() {
        this.message = "This works!";
    }
    showMessage() {
        console.log(this.message);
    }
}
__decorate([
    AutoBind
], Printer.prototype, "showMessage", null);
const p = new Printer();
const button = document.querySelector("button");
// button.addEventListener("click", p.showMessage.bind(p));
button.addEventListener("click", p.showMessage);
const registeredValidators = {};
function Required(target, propertyName) {
    registeredValidators[target.constructor.name] = {
        [propertyName]: ["required"]
    };
}
function PositiveNumber(target, propertyName) {
    registeredValidators[target.constructor.name] = {
        [propertyName]: ["positive"]
    };
}
function validate(obj) {
    const objValidatorConfig = registeredValidators[obj.constructor.name];
    if (!objValidatorConfig) {
        return true;
    }
    let isValid = true;
    for (const prop in objValidatorConfig) {
        for (const validator of objValidatorConfig[prop]) {
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
    constructor(t, p) {
        this.title = t;
        this.price = p;
    }
}
__decorate([
    Required
], Course.prototype, "title", void 0);
__decorate([
    PositiveNumber
], Course.prototype, "price", void 0);
const courseForm = document.querySelector("form");
courseForm === null || courseForm === void 0 ? void 0 : courseForm.addEventListener("submit", event => {
    event.preventDefault();
    const titleEl = document.getElementById("title");
    const priceEl = document.getElementById("price");
    const title = titleEl.value;
    const price = +priceEl.value;
    const createdCourse = new Course(title, price);
    if (!validate(createdCourse)) {
        console.log("invalid input");
    }
    console.log(createdCourse);
});
