const express =require("express")
const mongoose =require("mongoose")
const cors = require('cors');

const app=express();
app.use(cors());

const Router = require("./router/router")
const username = "Mrk__09";
const password = "Kalp8690";
const cluster = "cluster0.gav8c3c";
const dbname = "test";

try {
    mongoose.connect(`mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  () => console.log(" Mongoose is connected"),
)
} catch (error) {
    console.log("Mongoose error")
}

const db=mongoose.connection;
  db.on("error",console.error.bind(console,"connection error: "));
  db.once("open",function(){
    console.log("Database Connected")
  })


app.listen(8080,()=>{
    console.log("server start in port 8080")
})


app.use(Router);