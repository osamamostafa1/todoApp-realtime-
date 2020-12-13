const express = require('express')
const dotenv = require('dotenv')
const colors = require('colors')
const http = require('http')
const cors = require('cors')
const app = express()

// create server
const server = http.createServer(app);

// socket
const socketIo = require("socket.io")(server, { cors: { origins: '*:*' } });
app.set('io', socketIo)

// cors
app.use(cors({
    origin: ['http://localhost:4200'],
    credentials: true
}))


// Body parser
app.use(express.json())

// Load env vars & database
dotenv.config({ path: './config/config.env' })
const connectDb = require('./config/db')

// path router
const todoRouter = require('./routes/todo.routes')

// path middleware
const errorHandler = require('./middleware/error')

// connect Database
connectDb()

// Routers
app.use('/api/v1/todos', todoRouter)


// Error middleware It is must be come after Router
app.use(errorHandler)


//Port
const PORT = process.env.PORT || 5000

// npm start or npm run dev
server.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))



