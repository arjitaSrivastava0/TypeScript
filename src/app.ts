import { Invoice } from './classes/Invoice.js';
import { Payment } from './classes/Payment.js';
import { ListTemplate } from './classes/ListTemplate.js';
import { HasFormatter } from './interfaces/HasFormatter.js';

const form = document.querySelector('.new-item-form') as HTMLFormElement;
console.log(form.children);

// inputs
const type = document.querySelector('#type') as HTMLInputElement;
const tofrom = document.querySelector('#tofrom') as HTMLInputElement;
const details = document.querySelector('#details') as HTMLInputElement;
const amount = document.querySelector('#amount') as HTMLInputElement;

// list template instance
const ul = document.querySelector('ul')!;
const list = new ListTemplate(ul);

form.addEventListener('submit', (e: Event) => {
  e.preventDefault();

  let doc: HasFormatter;
  if (type.value === 'invoice') {
    doc = new Invoice(tofrom.value, details.value, amount.valueAsNumber);
  } else {
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

const addUID = <T extends {name: string}>(obj: T) => {
  let uid = Math.floor(Math.random() * 100);
  return {...obj, uid};
}

let docOne = addUID({name: 'yoshi', age: 40});
//let docTwo = addUID('shaun');

console.log(docOne.name);

// with interfaces
interface Resource<T> {
  uid: number;
  resourceName: string;
  data: T;
}

const docThree: Resource<object> = {
  uid: 1, 
  resourceName: 'person', 
  data: { name: 'shaun' }
};

const docFour: Resource<string[]> = {
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
function merge<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

const mergedObj = merge({name: 'Arjita', hobbies: ['Dance']},{ age: 23});
console.log(mergedObj.hobbies);

interface Lengthy {
  length: number;
}

//doesn't matter what type of elements we're getting
//but it does have length property
function countAndDescription<T extends Lengthy>(element: T) {
  let descriptionText = 'Got no value.';

  if(element.length === 1) {
    descriptionText = 'got 1 element';
  } else if(element.length > 1) {
    descriptionText = 'got '+element.length+' elements';
  }

  return [element, descriptionText];
}

console.log(countAndDescription('sdgf jsdgf'));


//Keyof constraints
//first parameter should be an object and the second
//parameter should be any kind of key in that object
function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U) {
  return 'Value: '+obj[key];
}

//passing an object along with key value which that object has
//if we're passing any kind of an object but we don't have that key
//then we'll get an array
const result = extractAndConvert({name: 'Arjita'}, 'name');
console.log(result);// Arjita

//Generic classes
//useful when may be we just don;t wanna store text, 
//might also want to stores number in different datastorage

//can use any primitive value we want 
class DataStorage<T extends string | number | boolean> {
  //this data is of type T
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    //if check if we don't find that item
    if(this.data.indexOf(item) === -1) {
      return;
    }
    this.data.splice(this.data.indexOf(item), 1);
  }

  getItems() {
    return [...this.data];//everything 
  }
}

//storing text in DataStorage
const textstorage = new DataStorage<string>();
textstorage.addItem('Arjita');
textstorage.addItem('gdfhg');
textstorage.removeItem('gdfhg');
console.log(textstorage);

//storing number in DataStorage
const numberStorage = new DataStorage<number>();
numberStorage.addItem(23);
numberStorage.addItem(73);
console.log(numberStorage);

////storing object in DataStorage
// const objectStorage = new DataStorage<object>();
// const maxObj = {name: 'something'};
// objectStorage.addItem({name: 'something'});
// objectStorage.addItem({name: 'anything'});
// objectStorage.removeItem(maxObj);
// console.log(objectStorage.getItems());

//Generic Utility
interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}

//partial turns courseGoal into a type
//which is also an object type where all the properties are optional

function createCourseGoal(
  title: string, 
  description: 
  string, 
  date: Date): CourseGoal {
    let courseGoal: Partial<CourseGoal> = {};
    courseGoal.title = title;
    courseGoal.description = description;
    courseGoal.completeUntil = date;
    return courseGoal as CourseGoal;
}

const names: Readonly<string[]> = ['Arjita', 'Srivastava'];
