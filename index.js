const express = require("express");
const appRouter = require(".//router/index");
require(".//config/db")
require('dotenv').config();



const app = express();
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json());
app.use("/api", appRouter)


app.listen(5000, (err) => {
    if (err) {
        console.error('Error starting the server:', err);
    } else {
        console.log('Server running on port 4500');
    }
});