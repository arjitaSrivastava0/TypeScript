//INTERFACEs
//
// type AddFn = (a: number, b: number) => number;
interface AddFn {
    (a: number, b: number) : number;
}

let add: AddFn;

add = (n1: number, n2: number) => {
    return n1+n2;
};

interface Named {
    readonly name?: string;
    //optionale properties can be represented with ? mark
    outputName?: string;
}

interface Greetable extends Named{
    //can not add private or public modifier inside 
    //interface only possible modifier that we can use 
    // is readonly modifier
    greet(phrase: string): void;
}

class Person implements Greetable{
    name?: string;

    constructor(n?: string) {
        if(n) {
            this.name = n;
        }
        
    }

    greet(phrase: string) {
        console.log(phrase + ' '+ this.name);
    } 

}

let user1: Greetable;
user1 = new Person('Arjita');

user1.greet('Hi this is');