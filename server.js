const express = require("express");
const mongoose = require("mongoose");
const app=express()

app.use(bodyParser.json());

const uri = 'your-mongodb-uri';

async function connect() {
    try {
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log(error);
    }
}

connect()


const routes = require("./routes");


app.use("/api", routes);

const port = process.env.PORT || 8000;
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})