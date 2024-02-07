const express = require('express');
const app = express();
const port = 3002;

// define the ping route
app.get('/ping',(req,res)=>{
  res.send("Message: Pong")
})

app.listen(port, () => {
console.log(`🚀 server running on PORT: ${port}`);
});


module.exports = app;
