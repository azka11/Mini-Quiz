const cors = require('cors');
const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser')
const adminRoute = require('./router/adminRoute')
const userRoute = require('./router/userRoute')
const questionRoute = require('./router/questionRoute')
const categoryRoute = require('./router/categoryRoute')
const choiceRoute = require('./router/choiceRoute')
const userAnswerRoute = require('./router/userAnswerRoute')
const app = express();
const port = 3000

app.use(cookieParser())
app.use(express.json())
app.use("/uploads", express.static("uploads"));

app.use(cors({
    origin: 'http://localhost:5173',
    allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    methods: "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    optionsSuccessStatus: 200,
    credentials: true
  }));

app.use(express.urlencoded({extended: true}))

app.use('/admin', adminRoute)
app.use('/user', userRoute)
app.use('/question', questionRoute)
app.use('/category', categoryRoute)
app.use('/choice', choiceRoute)
app.use('/user-answer', userAnswerRoute)

app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
  });

if (process.env.NODE_ENV != "test"){

    app.listen(port, () =>{
        console.log(`Server Running in port ${port}`)
    })
}

module.exports = app
