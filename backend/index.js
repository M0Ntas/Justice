const app = require('./app')
require('dotenv').config()
const port = process.env.REACT_APP_PORT
console.log('====>process.env.REACT_APP_PORT<====', process.env.REACT_APP_PORT)
app.listen(port, () => console.log(`Server has been started on ${port}`))
