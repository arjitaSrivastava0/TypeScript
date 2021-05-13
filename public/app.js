"use strict";
var _a;
const anchor = document.querySelector('a');
if (anchor) {
    console.log(anchor.href);
}
console.log(anchor.href);
//const form = document.querySelector('form')!;
const form = document.querySelector('.new-item-form');
console.log(form.children);
// inputs
const type = document.querySelector('#type');
const tofrom = document.querySelector('#tofrom');
const details = document.querySelector('#details');
const amount = document.querySelector('#amount');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(type.value, tofrom.value, details.value, amount.valueAsNumber);
});
const e1 = {
    name: 'Arjita',
    privileges: ['create-server'],
    startDate: new Date()
};
function add(a, b) {
    if (typeof a === 'string' || typeof b === 'string') {
        return a.toString() + b.toString();
    }
    return a + b;
}
const result = add('Arjita ', 'Srivastava');
//optional chaining
const fetchedUserDate = {
    id: 'u1',
    name: 'Arjita',
    job: { title: 'CEO', description: 'My own Company' }
};
//ts version
console.log((_a = fetchedUserDate === null || fetchedUserDate === void 0 ? void 0 : fetchedUserDate.job) === null || _a === void 0 ? void 0 : _a.title);
//js version
// console.log(fetchedUserDate.job && fetchedUserDate.job.title);
//nullish coalescing ??
const userInput = '';
//if userInput is just null or undefined not empty string then go with default
const storedData = userInput !== null && userInput !== void 0 ? userInput : 'Default';
console.log(storedData);
function printEmployeeInfo(emp) {
    console.log('Name: ' + emp.name);
    if ('privileges' in emp) {
        console.log('Privileges: ' + emp.privileges);
    }
    if ('startDate' in emp) {
        console.log('Start Date: ' + emp.startDate);
    }
}
printEmployeeInfo(e1);
class Car {
    drive() {
        console.log('Driving a truck... ');
    }
}
class Truck {
    drive() {
        console.log('Driving a truck... ');
    }
    loadCargo(amount) {
        console.log('Loading cargo... ' + amount);
    }
}
const v1 = new Car();
const v2 = new Truck();
function useVehicle(vehicle) {
    vehicle.drive();
    // if('loadCargo' in vehicle) {
    if (vehicle instanceof Truck) {
        vehicle.loadCargo(1000);
    }
}
useVehicle(v1);
useVehicle(v2);
function moveAnimal(animal) {
    let speed;
    switch (animal.type) {
        case 'bird':
            speed = animal.flyingSpeed;
            break;
        case 'horse':
            speed = animal.runningSpeed;
            break;
    }
    console.log(animal.type + ' Moving speed: ' + speed);
}
moveAnimal({ type: 'bird', flyingSpeed: 10 });
moveAnimal({ type: 'horse', runningSpeed: 100 });
//typecasting
//alternative, can be used any of them
// const userInputElement = <HTMLInputElement>document.getElementById('user-input');
// ! symbol allows to tell typescript that it never yields null
const userInputElement = document.getElementById('user-input');
//alternative to ! mark
if (userInputElement) {
    userInputElement.value = "Hi there";
}
const errorBag = {
    email: 'not a valid email',
    username: 'must start with a capital character'
};
