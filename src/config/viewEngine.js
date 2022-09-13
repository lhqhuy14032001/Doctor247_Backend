import express from "express";

let configViewEngine = (app) => {
    app.use(express.static(".src/public")) // giới hạn folder client có thể truy cập
    app.set("view engine", "ejs")
    app.set("views", "./src/views/") // set link to file view
}

module.exports = configViewEngine;