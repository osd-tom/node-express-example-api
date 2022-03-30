import express, { Express } from "express"
import mongoose from "mongoose"
import cors from "cors"
import { todoRoutes, userRoutes } from "./routes"

const app: Express = express()

const PORT: string | number = process.env.PORT || 4000
const CONNECTION_URL = "mongodb://localhost:27017/tododb"

app.use(cors())
app.use(express.json())
app.use('/api', todoRoutes)
app.use('/api', userRoutes)

mongoose.connect(CONNECTION_URL).then(() =>
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    )
  )