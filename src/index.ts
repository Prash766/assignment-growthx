import express from "express";
import cors from 'cors'
import connectDB from "./db/db";
import cookieParser from 'cookie-parser'

const app = express()
app.use(cors()) //mention the Origin Frontend URL to bypass the Cors Error
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded())


connectDB()


import userRouter from './routes/user.routes'
app.use('/api/v1/users', userRouter)


app.listen(4000 , ()=>{
    console.log("Server is running on port 4000")
})