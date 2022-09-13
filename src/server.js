import express from "express"
import bodyParser from "body-parser"// lấy các thông tin mà client gửi lên server (req)
import viewEngine from "./config/viewEngine"
import initWebRoutes from "./route/web"
require('dotenv').config()// goi ham config() trong lib dotenv

let app = express();

//config app
 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

viewEngine(app)
initWebRoutes(app)

let port = process.env.PORT || 6969

app.listen(port, () => {
    console.log("BE NodeJS is running on the port"+port)
})