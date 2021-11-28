//requesting mongooose and Schema so the class can be defined
const mongoose = require('mongoose')
const {Schema} = mongoose;
//setting up the Rules for our class using schema 
const musicalInstSchema = new Schema({

    type: String,
    brand: String,
    price: Number,
    condition: String,
    isAvailable: Boolean
  })

//defining the name of the constructor for our class
const MusicalInstruments = mongoose.model('MusicalInstruments', musicalInstSchema);
//export the class, also called a model or a document, to use in different files
module.exports = MusicalInstruments


// Another try
/* module.exports = class MusicalInstruments {



    constructor(type, brand, price, condition, isAvailable) {

        this._type = type;

        this._brand = brand;

        this._price = price;

        this._condition = ('New', 'Used');

        this._isAvailable = isAvailable;

    }



    get type() {

        return this._type;

    }



    setType(t) {

        this._type = t;

    }



    get brand() {

        return this._brand;

    }



    setBrand(b) {

        this._brand = b;

    }



    get price() {

        return this._price;

    }



    setPrice(p) {

        this._price = p;

    }



    get condition() {

        return this._condition;

    }



    setCondition(c) {

        this._condition = c;

    }



    get isAvailable() {

        return this._isAvailable;

    }



    setIsAvailable(a) {

        this._isAvailable = a;

    }



}


/*
let violin = new MusicalInstruments('String', 'Hofner', 280, [0], true);

console.log(violin._type);

console.log(violin._brand);

console.log(violin._price);

console.log(violin._condition[0]);

console.log(violin._isAvailable); */

