const User = require("../db/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const {promisify} = require("util");
const AppError = require("../utils/AppError");

const SECRET_ACCESS = process.env && process.env.SECRET_ACCESS;
const key = process && process.env && process.env.SECRET_ACCESS;

const signToken = async (id) => {
  const token = jwt.sign(
    {id}, 
    SECRET_ACCESS, 
    {expiresIn:'58m'}
  );
  return token
}

const signup = catchAsync(async (req, res) => {

  const { name, username, email, avatar, password, confirmPassword } = req.body;

  // Check Username Exists
//   const exists_username = await User.findOne({ username: username });
//   const exists_email = await User.findOne({ email: email });

//   if (exists_username) {
//     return res.status(418).json({
//       status: false,
//       message: "Username Already Taken!!",
//     });
//   }
//   if (exists_email) {
//     return res.status(418).json({
//       status: false,
//       message: "Email Already Taken!!",
//     });
//   }

  // encrypt password values
//   const hash_pass = await bcrypt.hash(password, 10);
  await User.syncIndexes();
  const result = await User.create({
    name: name,
    username: username,
    email: email,
    avatar: avatar,
    password: password,
    confirmPassword: confirmPassword
  });

  if(result){
    res.send({
        status: true,
        user: result,
        msg: "Signup Successfully",
    });
  } else {
    res.send({
        status: false,
        error: result,
        msg: "Failed to create user.",
    });
  }
});


const login = catchAsync ( async (req, res, next) => { 

   const { email, password } = req.body;

   if(!email || !password){
      return next(new AppError("Email and password is required !!", 401))
   }

   const user = await User.findOne({email}).select('+password');

   if(!user || !(await user.checkPassword(password, user.password))){
      return next(new AppError("Email or password is invalid !!", 401))
   }

   const token = await signToken(user._id);

   res.status(200).json({
    message:"Login Successfully !!",
    user : user,
    token
   });
});

const validateToken = catchAsync ( async (req, res, next) => {

  let authHeader = req.headers.Authorization || req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    let token = authHeader.split(" ")[1];
    if (!token) {
      next( new AppError("User is not authorized or token is missing", 403));
    }
    const decode = await promisify(jwt.verify)(token, key);
    if(decode){ 
      let result = await User.findById(decode.id);
      req.user = result;
      next(); 
    } else { 
      next(new AppError('User is not authorized', 401)); 
    }
  } else { 
    next( new AppError("Token is missing", 401));
  }
});

const profile = catchAsync ( async (req, res) => {
    res.json(req.user);
});

const forgotPassword = catchAsync ( async (req, res, next) => {

  // 1. Check is email valid or not
  const user = await User.findOne({email:req.body.email});
  if(!user){
     return next(new AppError("no user found associated with this email.", 404));
  } 
  
  // 2. Generate randow token string
  const resetToken = user.createPasswordResetToken();
  await user.save({validateBeforeSave:false});



  // 3. send token to email using nodemailer
  
});



module.exports = {  signup, login, validateToken, profile, forgotPassword };
