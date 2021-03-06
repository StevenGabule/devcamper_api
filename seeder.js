const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// load env vars
dotenv.config({path: './config/config.env'});

// load models
const Bootcamp = require('./models/Bootcamp');

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

// read json files
const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8'));

// import into db
const importData = async () => {
    try {
        await Bootcamp.create(bootcamps);
        console.log('data imported'.green.inverse)
        process.exit();
    } catch (e) {
        console.error(e)
    }
}


// delete data
const deleteData = async () => {
    try {
        await Bootcamp.deleteMany();
        console.log('data destroyed'.red.inverse)
        process.exit();
    } catch (e) {
        console.error(e)
    }
}

if (process.argv[2] === '-i') {
    importData().then(r => console.log(r));
} else if(process.argv[2] === '-d'){
    deleteData().then();
}
