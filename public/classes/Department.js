"use strict";
class Department {
    //shorthand initialization 
    //instead of definig var name on top we can just 
    //define it directly in the constructor 
    constructor(id, name) {
        this.id = id;
        this.name = name;
        // private name: string;
        this.employees = [];
    }
    //static method 
    static createEmployee(name) {
        return { name: name };
    }
    addEmployees(employee) {
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
    constructor(id, admins) {
        super(id, 'IT');
        this.admins = admins;
    }
    describe() {
        console.log('it department');
    }
}
class AccountingDepartment extends Department {
    //singletons and private constructor
    constructor(id, reports) {
        super(id, 'Accounting');
        this.reports = reports;
        this.lastReport = reports[0];
    }
    static getInstance() {
        if (AccountingDepartment.instance) {
            return this.instance;
        }
        this.instance = new AccountingDepartment('d4', []);
        return this.instance;
    }
    get mostRecentReport() {
        if (this.lastReport) {
            return this.lastReport;
        }
        throw new Error('No report found.');
    }
    set mostRecentReport(value) {
        if (!value) {
            throw new Error('please pass in a valid value');
        }
        this.addReport(value);
    }
    //override method addE mployee
    addEmployee(name) {
        if (name === 'Arjita') {
            return;
        }
        this.employees.push(name);
    }
    addReport(text) {
        this.reports.push(text);
    }
    printReports() {
        console.log(this.reports);
    }
    describe() {
        console.log('Accounting Department - ID ' + this.id);
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
