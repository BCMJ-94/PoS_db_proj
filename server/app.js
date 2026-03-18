const express = require('express')
const cors = require('cors')
const app = express()
const port = 3030

const corsOptions = {
    origin: "http://localhost:5173/",
    credentials: true,
}

app.use(cors(corsOptions))

app.get('/', (req, res) => {
    res.send('h World')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})