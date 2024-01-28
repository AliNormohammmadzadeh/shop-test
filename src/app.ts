import express from "express";
import 'dotenv/config';
import { connectDB } from "./config/db";
import userRoutes from './routes/userRoute'
import itemRoutes from './routes/itemRoute'
import cors from 'cors'

const app = express()
const port = process.env.PORT || 3000;  

connectDB()

app.use(express.json())
app.use(cors())

app.use('/api', userRoutes)
app.use('/api', itemRoutes)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port , () => {
    console.log(`Server is running on port ${port}`)
})