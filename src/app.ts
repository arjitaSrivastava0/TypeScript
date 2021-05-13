const anchor = document.querySelector('a')!;
if(anchor) {
  console.log(anchor.href);
}
console.log(anchor.href);

//const form = document.querySelector('form')!;
const form = document.querySelector('.new-item-form') as HTMLFormElement;
console.log(form.children);

// inputs
const type = document.querySelector('#type') as HTMLInputElement;
const tofrom = document.querySelector('#tofrom') as HTMLInputElement;
const details = document.querySelector('#details') as HTMLInputElement;
const amount = document.querySelector('#amount') as HTMLInputElement;

form.addEventListener('submit', (e: Event) => {
  e.preventDefault();

  console.log(
    type.value, 
    tofrom.value, 
    details.value, 
    amount.valueAsNumber
  );
});


//typeguard is a term that describes the idea 
//or approach of checking if a certain property or method 
//exists before we try to use it.

type Admin = {
    name: string;
    privileges: string[];
  };
  
  type Employee = {
    name: string;
    startDate:  Date;
  };
  
  type ElevatedEmployee = Admin & Employee;
  
  const e1: ElevatedEmployee ={
    name: 'Arjita',
    privileges: ['create-server'],
    startDate: new Date()
  };
  
  type Combinable = string | number;
  type Numeric = number | boolean;
  
  type Universal = Combinable & Numeric;

    //function overloads
  function add(a: number, b: number): number;
  function add(a: string, b: string): string;
  function add(a: string, b: number): string;
  function add(a: number, b: string): string;
  function add(a: Combinable, b: Combinable) {
    if(typeof a === 'string' || typeof b === 'string') {
      return a.toString() + b.toString();
    }
  
    return a+b;
  }

  const result = add('Arjita ', 'Srivastava'); 
  
//optional chaining
  const fetchedUserDate = {
    id: 'u1',
    name: 'Arjita',
    job: {title: 'CEO', description: 'My own Company'}
  };

//ts version
  console.log(fetchedUserDate?.job?.title);


 //js version
  // console.log(fetchedUserDate.job && fetchedUserDate.job.title);

//nullish coalescing ??
  const userInput ='';
  //if userInput is just null or undefined not empty string then go with default
  const storedData = userInput ?? 'Default';
  console.log(storedData);
  




  type UnknownEmployee = Employee | Admin;
  
  function printEmployeeInfo(emp: UnknownEmployee) {
    console.log('Name: ' +emp.name);
    if('privileges' in emp) {
      console.log('Privileges: '+emp.privileges);
    }
    if('startDate' in emp) {
      console.log('Start Date: '+emp.startDate);
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

    loadCargo(amount: number) {
      console.log('Loading cargo... '+amount);
    }
  }

  type Vehicle = Car | Truck;

  const v1 = new Car();
  const v2 = new Truck();

  function useVehicle(vehicle: Vehicle) {
    vehicle.drive();
    // if('loadCargo' in vehicle) {
    if(vehicle instanceof Truck) {
      vehicle.loadCargo(1000);
    }
  }

  useVehicle(v1);
  useVehicle(v2);

  //Discriminated_unions

  interface Bird {
    type: 'bird';
    flyingSpeed: number;

  }

  interface Horse {
    type: 'horse';
    runningSpeed: number;
  }

  type Animal = Bird | Horse;

  function moveAnimal(animal: Animal) {
    let speed;
    switch(animal.type) {
      case 'bird' :
        speed = animal.flyingSpeed;
        break;
      
      case 'horse' :
        speed = animal.runningSpeed;
        break; 
    }
    console.log(animal.type+' Moving speed: '+speed);
    
  }


  moveAnimal({type: 'bird', flyingSpeed: 10});
  moveAnimal({type: 'horse', runningSpeed: 100});


  //typecasting

  //alternative, can be used any of them
  // const userInputElement = <HTMLInputElement>document.getElementById('user-input');
  
  // ! symbol allows to tell typescript that it never yields null
  const userInputElement = document.getElementById('user-input')! as HTMLInputElement;
  
  //alternative to ! mark
  if(userInputElement) {
    (userInputElement as HTMLInputElement).value = "Hi there";
  }
  // userInputElement.value = 'Hi there';

//index property allows us to
// have as many properties as we want or need
  interface ErrorContainer {
    [prop:  string]: string;
  }

  const errorBag: ErrorContainer  = {
    email: 'not a valid email',
    username: 'must start with a capital character'
  };





  
  