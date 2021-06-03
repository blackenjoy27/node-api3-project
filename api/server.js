const express = require('express');
const {logger} = require("./middleware/middleware");
const UserRouter = require("./users/users-router");
const server = express();

server.use(express.json());
server.use(logger);
// remember express by default cannot parse JSON in request bodies

// global middlewares and the user's router need to be connected here

server.use("/api/users", UserRouter);

// server.get('/', (req, res) => {
//   res.send(`<h2>Let's write some middleware!</h2>`);
// });



server.use((error,req,res,next)=>{
  res.status(error.status||500).json({
    msg: "Error is return",
    message:error.message,
    status: error.status
  })
})

module.exports = server;
