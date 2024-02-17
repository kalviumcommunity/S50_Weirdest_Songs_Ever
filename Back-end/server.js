const express = require("express");
const port = 3000;
const connectDb = require("../Back-end/config/database");
const app = express();
const userRouter = require("./Routes/userRoute")
const postRouter = require("./Routes/postRoute")

connectDb();

app.get('/ping',(req,res)=>{
  res.send("Message: Pong")
})

app.use(express.json())

app.use("/",userRouter);
app.use("/",postRouter);


app.listen(port, () => {
console.log(`🚀 server running on PORT: ${port}`);
});


module.exports = app;
