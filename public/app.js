import { Invoice } from './classes/Invoice.js';
import { Payment } from './classes/Payment.js';
import { ListTemplate } from './classes/ListTemplate.js';
const form = document.querySelector('.new-item-form');
console.log(form.children);
// inputs
const type = document.querySelector('#type');
const tofrom = document.querySelector('#tofrom');
const details = document.querySelector('#details');
const amount = document.querySelector('#amount');
// list template instance
const ul = document.querySelector('ul');
const list = new ListTemplate(ul);
form.addEventListener('submit', (e) => {
    e.preventDefault();
    let doc;
    if (type.value === 'invoice') {
        doc = new Invoice(tofrom.value, details.value, amount.valueAsNumber);
    }
    else {
        doc = new Payment(tofrom.value, details.value, amount.valueAsNumber);
    }
    list.render(doc, type.value, 'end');
});
// GENERICS
// const addUID = (obj: object) => {
//   let uid = Math.floor(Math.random() * 100);
//   return {...obj, uid};
// }
// const addUID = <T extends object>(obj: T) => {
//   let uid = Math.floor(Math.random() * 100);
//   return {...obj, uid};
// }
const addUID = (obj) => {
    let uid = Math.floor(Math.random() * 100);
    return Object.assign(Object.assign({}, obj), { uid });
};
let docOne = addUID({ name: 'yoshi', age: 40 });
//let docTwo = addUID('shaun');
console.log(docOne.name);
const docThree = {
    uid: 1,
    resourceName: 'person',
    data: { name: 'shaun' }
};
const docFour = {
    uid: 1,
    resourceName: 'shoppingList',
    data: ['bread', 'milk']
};
console.log(docThree, docFour);
//some new additions 
// const promise: Promise<any> = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('This is done! ');
//   }, 2000);
// });
// promise.then(data => {
// });
//functions & constraints with generics
function merge(objA, objB) {
    return Object.assign(objA, objB);
}
const mergedObj = merge({ name: 'Arjita', hobbies: ['Dance'] }, { age: 23 });
console.log(mergedObj.hobbies);
//doesn't matter what type of elements we're getting
//but it does have length property
function countAndDescription(element) {
    let descriptionText = 'Got no value.';
    if (element.length === 1) {
        descriptionText = 'got 1 element';
    }
    else if (element.length > 1) {
        descriptionText = 'got ' + element.length + ' elements';
    }
    return [element, descriptionText];
}
console.log(countAndDescription('sdgf jsdgf'));
//Keyof constraints
//first parameter should be an object and the second
//parameter should be any kind of key in that object
function extractAndConvert(obj, key) {
    return 'Value: ' + obj[key];
}
//passing an object along with key value which that object has
//if we're passing any kind of an object but we don't have that key
//then we'll get an array
const result = extractAndConvert({ name: 'Arjita' }, 'name');
console.log(result); // Arjita
//Generic classes
//useful when may be we just don;t wanna store text, 
//might also want to stores number in different datastorage
//can use any primitive value we want 
class DataStorage {
    constructor() {
        //this data is of type T
        this.data = [];
    }
    addItem(item) {
        this.data.push(item);
    }
    removeItem(item) {
        //if check if we don't find that item
        if (this.data.indexOf(item) === -1) {
            return;
        }
        this.data.splice(this.data.indexOf(item), 1);
    }
    getItems() {
        return [...this.data]; //everything 
    }
}
//storing text in DataStorage
const textstorage = new DataStorage();
textstorage.addItem('Arjita');
textstorage.addItem('gdfhg');
textstorage.removeItem('gdfhg');
console.log(textstorage);
//storing number in DataStorage
const numberStorage = new DataStorage();
numberStorage.addItem(23);
numberStorage.addItem(73);
console.log(numberStorage);
//partial turns courseGoal into a type
//which is also an object type where all the properties are optional
function createCourseGoal(title, description, date) {
    let courseGoal = {};
    courseGoal.title = title;
    courseGoal.description = description;
    courseGoal.completeUntil = date;
    return courseGoal;
}
const names = ['Arjita', 'Srivastava'];
