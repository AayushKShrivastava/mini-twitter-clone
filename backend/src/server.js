const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const auth_routes = require('./routes/auth_routes')
const user_routes = require('./routes/user_routes')
const post_routes = require('./routes/post_routes')
const cookie_parser = require('cookie-parser')

dotenv.config()

const app = express()

app.use(cors({origin:true, credentials:true}))

//for parsing application/json
app.use(express.json())

app.use(cookie_parser())

app.use('/auth', auth_routes)
app.use('/user', user_routes)
app.use('/posts', post_routes)

const PORT = process.env.PORT || 3001

app.listen(PORT, ()=>console.log(`Server started on PORT ${PORT}`));