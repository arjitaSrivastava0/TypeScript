"use strict";
//spread operator
const hobbies = ['Sports', 'Cooking'];
const activeHobbies = ['Hiking'];
//pull all the elements in the array hobboes and add them as a list 
//of individual values in the place where we use operator
//if we need comma separated list of values we can use spread operator
activeHobbies.push(...hobbies);
const person = {
    firstName: 'Arjita',
    age: 23
};
const copied = Object.assign({}, person);
console.log(copied);
//Rest parameter
//rest operator merge all incoming parameters into an array
//of type any or we can explicitely pass the type
const add = (...numbers) => {
    return numbers.reduce((currResult, currValue) => {
        return currResult + currValue;
    }, 0);
};
console.log(add(3, 5, 3, 5, 2, 5, 2));
//array and object destructuring
const [hobby1, hobby2, ...remainigHobbies] = hobbies;
console.log(hobbies, hobby1, hobby2);
const { firstName, age } = person;
console.log(firstName, age);
