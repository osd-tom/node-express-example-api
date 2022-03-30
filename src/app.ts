import express, { Express } from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import { authRoutes, todoRoutes, userRoutes } from "./routes"

const app: Express = express()
dotenv.config()

const PORT: string | number = process.env.PORT || 4000
const CONNECTION_URL = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`

app.use(cors())
app.use(express.json())
app.use('/api', todoRoutes)
app.use('/api', userRoutes)
app.use('/api/auth', authRoutes)

mongoose.connect(CONNECTION_URL).then(() =>
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    )
  )