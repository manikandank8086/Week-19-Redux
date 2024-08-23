import express from 'express'
import userRouter from './Routes/UserRoute.js'
import adminRouter from './Routes/AdminRoute.js'
import connectDB from './Database/DbConnection.js'
import cors from 'cors'

const app = express()
connectDB()

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods if needed
    credentials: true // Allow cookies if required
}));

app.use(express.json());


app.use(userRouter)
app.use(adminRouter)

app.listen(3000)
