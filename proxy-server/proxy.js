import Koa from "koa"
import cors from "@koa/cors"
const app = new Koa()
const port = process.env.PORT || 3000

app.use(cors())

app.use(
  proxy("/", {
    // target: "https://jeopardee.netlify.app/", 
    target: "https://jeopardee-back-end.herokuapp.com/",
    changeOrigin: true,
    logs: true,
  })
)

app.listen(port)
console.log(`listening on port ${port}`)