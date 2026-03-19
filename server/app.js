import express from 'express'
import cors from 'cors'
import session from 'express-session'

import employeesRouter from './routes/employeesRoute.js'
import authRouter from './routes/authRoute.js'

const app = express()
const port = 3030

const corsOptions = { 
    origin: "http://localhost:5173", 
    credentials: true
}

app.use(express.json())
app.use(cors(corsOptions))

const expiration_30_minutes = 1000 * 60 * 30
app.use(session({
    secret : process.env.SESSION_KEY,
    resave : false,
    saveUninitialized : false,
    cookie : {
        secure : false,
        maxAge : expiration_30_minutes,
        httpOnly : true
    }
}))

app.use('/employees', employeesRouter)
app.use(authRouter)

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
