const express= require("express")
const cors = require("cors");
const connection= require("./db")
const {userRouter}= require("./routes/user.routes")
// const {noteRouter}= require("./routes/note.routes")

const app= express();
app.use(cors());

app.use(express.json())
app.use("/users", userRouter)
// app.use("/notes", noteRouter)

app.get("/", (req, res)=>{
    res.send("Welcome")
})



app.listen(8080,async()=>{
   try{
    await connection
    console.log("connected to DB")
    console.log("server is running on port 8080")
   }
   catch(err){
    console.log(err)
   }
    
})