const express = require('express')
const dotenv = require('dotenv').config()
const PORT = process.env.PORT || 5000
const {errorHandler} = require('./middleware/errorMiddleware')
const connDB = require('./config/db')

// connect to database
connDB()
const app = express()  

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.get ('/', (req, res) => {
    res.json({message:'nilesh'})
})
//Routes
app.use('/api/users',require('./routes/userRoutes'))

app.use(errorHandler)

app.listen(PORT, () => console.log('Server started on port ' + PORT))