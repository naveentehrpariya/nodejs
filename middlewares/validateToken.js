const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');



const validateToken = asyncHandler(async (req, res, next) => {
    console.log("process.env.SECERT_ACCESS", process.env && process.env.SECRET_ACCESS);
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    jwt.verify(token, process.env && process.env.SECERT_ACCESS, (err, decoded) => {
      console.log("token", token); 
      console.log("process.env && process.env.SECERT_ACCESS", process.env.SECRET_ACCESS);
      console.log("err=>", err);
      console.log("decoded", decoded);
      if (err) {
        res.status(401); 
        throw new Error("User is not authorized");
      }
      req.user = decoded.user;
      next();
    });

    if (!token) {
      res.status(401);
      throw new Error("User is not authorized or token is missing");
    }

  }
});

module.exports = validateToken;