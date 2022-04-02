const express = require('express')
const router = express.Router()
const Car = require('../models/carSchema')

// show route
router.get('/', (req, res) => {

    Car.find({}, (error, cars) => {

        if(error) {
            res.status(400).json({error: error.message})
        }

        res.status(200).json(cars)

    })
})

// new car

router.post('/', (req, res) => {

    Car.create(req.body, (error, createdCar) => {

        if(error) {
            res.status(400).json({error: error.message})
        }

        res.status(200).json(createdCar)

    })
})


router.get('/:id', (req, res) => {

    Car.findById(req.params.id, (error, car) => {

        if(error) {
            res.status(400).json({error: error.message})
        }

        res.status(200).json(car)

    })

})

// Delete Route:
router.delete('/:id', (req, res) => {

    Car.findByIdAndDelete(req.params.id, (error, car) => {

        if(error) {
            res.status(400).json({error: error.message})
        }

        res.status(200).json(car)

    })

})

// Update Route:
router.put('/:id', (req, res) => {

    Car.findByIdAndUpdate(req.params.id, req.body, {new: true}, (error, updatedCar) => {

        if(error) {
            res.status(400).json({error: error.message})
        }

        res.status(200).json(updatedCar)        

    })

})


module.exports = router