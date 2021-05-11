

abstract class Department {
    // private name: string;
    protected employees: string[] = [];

    //shorthand initialization 
    //instead of definig var name on top we can just 
    //define it directly in the constructor 
    constructor(protected readonly id: string, public name: string) { }

    //static method 
    static createEmployee(name: string) {
        return {name: name};
    }

    abstract describe(this: Department): void ;

    addEmployees(employee: string) {
        this.employees.push(employee);
        //here if we'll try to assign the id then it'll
        //through an exception because it is readonly modifier
        // this.id = 'D2';
    }

    printEmployeeInfo() {
        console.log(this.employees.length);
        console.log(this.employees);
    }
  
}


//INHERITENCE
//method overriding
class ITDepartment extends Department {
    admins: string[];
    constructor(id: string, admins: string[]) {
        super(id, 'IT');
        this.admins = admins;
    }
    describe() {
        console.log('it department');
    }
}


class AccountingDepartment extends Department {

    //storing accoumtingdepartment instance
    private static instance: AccountingDepartment;
    private lastReport: string;

    //singletons and private constructor
    private constructor(id: string, private reports: string[]) {
        super(id, 'Accounting');
        this.lastReport = reports[0]; 
    }

    static getInstance() {
         if(AccountingDepartment.instance) {
            return this.instance;
         }
         this.instance = new AccountingDepartment('d4', []);
         return this.instance;
    }

    get mostRecentReport() {
        if(this.lastReport) {
            return this.lastReport;
        }
        throw new Error('No report found.');
    }

    set mostRecentReport(value: string) {
        if(!value) {
            throw new Error('please pass in a valid value');
        }
        this.addReport(value);
    }

    //override method addE mployee
    addEmployee(name: string) {
        if(name === 'Arjita') {
            return;
        } 
        this.employees.push(name);
    }

    addReport(text: string) {
        this.reports.push(text);
    }

    printReports() {
        console.log(this.reports);
    }

    describe() {
        console.log('Accounting Department - ID '+this.id);
    }
}

const employeee = Department.createEmployee('jdgf');
console.log(employeee);

// const department = new Department('D1', 'Accounting');

Department.createEmployee('kshf');
// department.addEmployees('Arjita');
// department.addEmployees('Aarush');
// department.describe();
// department.printEmployeeInfo();

// console.log(department);

const itDepartment = new ITDepartment('D1', ['Someone']);

itDepartment.addEmployees('Arjita');
itDepartment.addEmployees('Aarush');
itDepartment.describe();
itDepartment.printEmployeeInfo();

console.log(itDepartment);

// const accountingDepartment = new AccountingDepartment('D3', []);
const accounting = AccountingDepartment.getInstance();

// accountingDepartment.mostRecentReport = '';
// accountingDepartment.addReport('Something went wrong...');
// accountingDepartment.printReports();
// accountingDepartment.describe();
console.log(accounting);



