const Koa = require("koa")
const cors = require("@koa/cors")
const app = new Koa()
const port = process.env.PORT || 3000

app.use(cors())

app.listen(port)
console.log(`listening on port ${port}`)