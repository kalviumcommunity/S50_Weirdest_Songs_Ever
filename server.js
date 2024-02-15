const express = require("express");
const port = 3003;
const connectDb = require("./config/database");
const app = express();
const router = require("./Routes/userRoute")

connectDb();

app.get('/ping',(req,res)=>{
  res.send("Message: Pong")
})

app.use(express.json())

app.use("/",router);

app.listen(port, () => {
console.log(`🚀 server running on PORT: ${port}`);
});


module.exports = app;
