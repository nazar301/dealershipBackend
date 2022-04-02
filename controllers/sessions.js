const User = require("../users/user")
const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router()




router.get('/', (req, res) => {
    res.send('works')
}) 

router.get('/register', (req, res)=>{
    res.send('working')
})

router.post('/register', async (req,res, next)=>{
    try {
        if(req.body.password === req.body.verifyPassword) {
            const wantedUsername = req.body.username
            const userExists = await User.findOne({ username: wantedUsername})
            if (userExists) {
                res.json({message: 'username taken'})
                console.log('nope')
            } else {
                const salt = bcrypt.genSaltSync(10)
                const hashedPassword = bcrypt.hashSync(req.body.password, salt)
                req.body.password = hashedPassword
                const newUser = await User.create(req.body)
                console.log(newUser)
             res.json({message: 'username created', newUser})
             console.log('banger')
            }
        } else {
            console.log('sent')
        }
    } catch(err){
        next(err)
    }
})
router.get('/login', (req, res)=> {
    User.find({}, (err, username) => {
        res.json({username})

    })
    console.log('user to login')
})

    router.post('/login', async(req,res,next) =>{
        try { 
            const userLogin =await User.findOne({ username: req.body.username})
            console.log(userLogin)
        if (userLogin) {
            const validPassword = bcrypt.compareSync(req.body.password, userLogin.password)
        if(validPassword) {
            req.session.username = userLogin.username
            req.session.userLogin = true

            console.log('user loged in')
        } else {

            // need to redirect  to login
            next()    
            console.log(next)
        }
    } else {
        console.log('error not connected')
        // need to redirecte to login 
    }
} catch (err) {
    res.json(err)
    console.log(err)
    next(err)
}
}
)


router.get('/logout', (req, res) => {
    req.session.destroy()

    res.redirect('')
})


module.exports = router