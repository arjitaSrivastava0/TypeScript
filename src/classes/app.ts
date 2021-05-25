import "reflect-metadata";
import {plainToClass} from "class-transformer";
import {validate} from "class-validator";
import {Product} from "./product.models";

const products = [
    {title: 'A top', price: 500},
    {title: 'A pen', price: 20}
];

const newProd = new Product('', -7);
validate(newProd).then(error =>{
    if(error.length > 0) {
        console.log("validation error");
        console.log(error);
        
    } else {

        console.log(newProd.getInformation());
    }
});


const loadedProducts = plainToClass(Product, products);

for(const prod of loadedProducts) {
    console.log(prod.getInformation());
}
