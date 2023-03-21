const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const key = process && process.env && process.env.SECRET_ACCESS;

const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    console.log("SECERT_ACCESS 1", process && process.env && process.env.SECRET_ACCESS);
    console.log("token", token); 
    jwt.verify(token, (process && process.env && process.env.SECRET_ACCESS), (err, decoded) => { 
      if (err) {
        console.log("err=>", err);
        res.status(401); 
        throw new Error("User is not authorized");
      }
      console.log("decoded.user=>", decoded.user);
      let result = decoded.user
      delete result.password
      req.user = result
      next(); 
    });

    if (!token) {
      res.status(401);
      throw new Error("User is not authorized or token is missing");
    }

  }
});

module.exports = validateToken;