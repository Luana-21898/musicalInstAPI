//express for server and routes
const express = require('express')
//bodyParser for x-www-urlencoded (html form like) variables
const bodyParser = require('body-parser')
// defining the actual app to handle the requests (e.g. push, get, etc.)
const app = express()
const port = 3000
// require the driver to connect to the database
const mongoose = require('mongoose')
// require the class constructor from different file
const MusicalInstruments = require('./musicalinst.js')


//make the app use the bodyParser
app.use(bodyParser.urlencoded({
    extended: false
}))

app.get('/musicalinst', (req, res) => {
    MusicalInstruments.find((err, musicalinst) => {
        if (err) {
            res.send("Error occured no Musical Instruments retrieved")
            return
        }
        res.send(musicalinst)
        //log the result in the console as well
        console.log(musicalinst)
    })
})
app.get('/musicalinst/:brand', (req, res) => {
    const brand = req.params.brand;

    MusicalInstruments.findByBrand(brand, (err, musicalinst) => {
        if (err) {
            res.send("Musical Instrument not found")
            return
        }
        res.send(musicalinst)
        console.log(musicalinst)
    })
})

app.post('/musicalinst', (req, res) => {
    console.log("Inserting a Musical Instrument in the database")

    let _isAvailable = false;
    if (req.body._isAvailable === 'true') {
        _isAvailable = true;
    }

    let musicalinst = new MusicalInstruments({
        price = parseInt(req.body.price),
        brand = req.body.brand,
        type = req.body.type,                
        condition = req.body.condition,
        isAvailable = _isAvailable
    });

    musicalinst.save(err => {
        if (err) {
            // if error send a message to let the user know
            res.send(`Musical Instrument not inserted into the database, error is: ${err}`)
            //return to be used in order to not send to res.send and crash the program
            return
        }
        //send a message to the user with the result
        res.send("Musical Instrument inserted into the database")
        console.log("Musical Instrument is in the database")
    })

    //if return runs, code will start from here
    return
})
// -->
app.put('/musicalinst/:brand', (req, res) => {
    console.log("Trying to edit musical instrument")
    console.log(req.body.brand)


    MusicalInstruments.findByBrandAndUpdate(req.params.brand, {
        type: req.body.type,
        brand: req.body.brand,
        price: ((parseInt(req.body.price) == NaN) ? 0 : parseInt(req.body.price)),
        condition: req.body.condition,
        isAvailable: (req.body.isAvailable === 'true')
    }, err => {
        if (err) {
            res.send("It didn't edit. The error is: " + err)
            return;
        }
        res.send("It did edit")
    })
})


//delete request using DELETE and a PARAMETER (brand)
app.delete('/musicalinst/:brand', (req, res) => {

    MusicalInstruments.findByBrandAndDelete(req.params.brand, err => {
        if (err) {
            res.send("Musical Instrument wasn't deleted")
            return
        }
        res.send("Musical Instrument deleted")
        console.log(`Musical Instrument with brand ${req.params.brand} is now deleted`)
    })
})

//start the server
app.listen(port, () => {
    //change the link to your database
    mongoose.connect('mongodb+srv://Luanahf:1223!Mongo@musicalinstapi.evr2b.mongodb.net/myFirstDatabase?retryWrites=true&w=majority').
        catch(error => console.log(error));
    console.log(`Example app listening at http://localhost:${port}`)
})

//OLD CODE! NOT REQUIRED!  ONLY FOR REFERENCE
/*
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
// const MusicalInstruments = require('./musicalinst.js')
const mongoose = require('mongoose')
const { Schema } = mongoose

const musicalInstrumentsSchema = new Schema({
    type: String,
    brand: String,
    price: Number,
    condition: Number,
    isAvailable: Boolean
})

const MusicalInstruments = mongoose.model('MusicalInstruments', musicalInstrumentsSchema);

const musicalinst = new MusicalInstruments({type: "Strings", brand: "Ibanez", price: 1400, condition: 0, isAvailable: true})


// const path = require('path');
const { domainToUnicode } = require('url')

app.use(bodyParser.urlencoded({ extended: false }))

/* let musicalinst1 = new MusicalInstruments("String", "Hofner", 280, [0], true);
let musicalinst2 = new MusicalInstruments("String", "Fender", 2000, [1], false);

let musicalinsts = [musicalinst1, musicalinst2]; */

// console.log(musicalinst1);


/*app.get('/', (req, res) => {
    res.send('Hello, Luana França!')
})

app.get('/message', (req, res) => {
    res.send('This is a message.')
})

app.get('/secondmessage', (req, res) => {
    res.send('This is a second message.')
})

app.get('/showmusicalinst', (req, res) => {
    console.log('Someone is requiring a musical instrument')
    res.send(musicalinsts)
})

app.post('/showmusicalinst', (req, res) => {
    console.log('Someone is trying to post something')
    res.send('Heyyyy, you posted something')
    console.log(req.body);

    /*    let type = req.body.type; 
       let brand = req.body.brand;
       let price = parseInt(req.body.price);
       let condition = req.body.condition;
       let isAvailable = (req.body.isAvailable === 'true');
    */
  /*  let guitar = new MusicalInstruments(req.body.type, req.body.brand, parseInt(req.body.price), req.body.condition, req.body.isAvailable);
    musicalinsts.push(guitar);
    console.log(guitar);
})

app.delete('/deletemusicalinst/:brand', (req, res) => {

    let newMusicalsArray = [];
    musicalinsts.forEach(d => {
        if (!(d._brand === req.params.brand)) {
            newMusicalsArray.push(d)
        }
    })
    console.log("Musical Instrument deleted. This is the new database:")
    console.log(newMusicalsArray);
    musicalinsts = newMusicalsArray;
    res.send("Delete in progress");

})

app.put('/updatemusicalinstr/', (req, res) => {

})

app.post('musicalinst/', (req,res)=>{
    console.log("Inserting a musical instrument in the database")
    musicalinst.save()
    res.send("Musical Instrument Saved")
})

app.listen(port, () => {

    mongoose.connect('mongodb+srv://Luanahf:1223!Mongo@musicalinstapi.xkapt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority').
        catch(error => console.log(error));
    console.log(`Example app listening at http://localhost:${port}`)
})
*/

// //test get or browser requets // should be deleted after testing is done
// app.get('/', (req, res) => {
//   res.send('George Blanaru')
// })

// app.get('/message', (req, res) => {
//     res.send('Hi, this is a nice message');
// })

// app.get('/othermessage', (req, res) => {
//     res.send('This is the second message');
// })

// app.get('/showdog', (req, res) =>{
//     console.log('Someone is requiring a dog;')
//     res.send(dogs)
// })

// app.post('/showdog', (req, res) =>{
//   //insert using post!
//     console.log('Someone is trying to post something');
//     res.send('Congrats, you posted something');
//     console.log(req.body);
//     // let name = req.body.name;
//     // let age = parseInt(req.body.age);
//     // let breed = req.body.breed;
//     let isNeutred = (req.body.isNeutred === 'true');
//     let dog = new Dog({age: parseInt(req.body.age),name: req.body.name,breed: req.body.breed,isNeutred: isNeutred});
//     dogs.push(dog)
//     console.log(dog)
// })



// app.delete('/deletedog/:name', (req, res) =>{
//   //"dogs" is the database
//   //newDogsArray is a holder for the updated Database
//   let newDogsArray =[];
//   //for loop in JavaScript, takes each element and assigns it to the variable "d"
//   //
//   dogs = dogs.forEach(d =>{
//     //checks to see if the name from the parameter matches the dogs name
//     if(!(d._name === req.params.name)){
//       //if it doesn't match, add it to the new array
//        newDogsArray.push(d)
//     }
//   })
//   console.log("Dog deleted, new database looks like this")
//   console.log(newDogsArray);
//   //update the "database / dogs"
//   dogs = newDogsArray;
//   //send a result to postman/user so it doesn't get stuck on loading
//   res.send("Delete in progress");


// })