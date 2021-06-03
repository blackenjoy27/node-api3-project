const {getById} = require("../users/users-model")

function logger(req, res, next) {
  // DO YOUR MAGIC
  console.log("Request",req);
  console.log("Response",res);
  console.log("Timestatpe: ",Date.now());
  next();
}

function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  getById(req.params.id)
  .then(user=>{
    if(!user){
      next({
        message: "user not found",
        status: 404
      })
    }else{
      req.user = user;
      next();
    }
  })
  .catch(next)
}

function validateUser(req, res, next) {
    const {name} = req.body;
    if(!name||!name.trim()){
      next({
        message: "missing required name field",
        status:400
      })
    }else{
      req.name = {name:name};
      next();
    }
  // DO YOUR MAGIC
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  const {text} = req.body;
  if(!text||!text.trim()){
    next({
      message: "missing required text field",
      status:400
    })
  }else{
    req.text = {text:text};
    req.body.user_id = req.user.id;
    next();
  }
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}