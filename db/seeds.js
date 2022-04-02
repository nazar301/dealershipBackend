const mongoose = require('./connection')
const Car = require('../models/carSchema')

Car.deleteMany({})

    .then(()=>{
        return Car.insertMany([
            {
                'make': 'Subaru',
                'model': 'Impreza',
                'color': 'red',
                'bodyStyle': 'hatchback',
                'year': '2014',
                'milage': '94000',
                'description': 'text',
            }
        ])
    })

    .then ((data)=> console.log(data))
    .catch(err => console.log(err))