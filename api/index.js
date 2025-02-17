import "dotenv/config"
import db from "dat/index.js"
import express, { json } from "express"
import cors from "cors"
import { errorHandler } from "./routes/helpers/index.js"
import { usersRouter, eventsRouter } from "./routes/index.js"

db.connect(process.env.MONGO_URL).then(() => {
  console.log("connected to db")

  const server = express()

  // server.use(cors())

  const corsOptions = {
    origin: "https://dancetapp.netlify.app",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  }

  server.use(cors(corsOptions))

  server.get("/", (_, res) => res.send("Hello, API!"))

  server.use("/users", usersRouter)
  server.use("/events", eventsRouter)

  server.use(errorHandler)

  server.listen(process.env.PORT, () =>
    console.log(`API listening on port ${process.env.PORT}`)
  )
})
