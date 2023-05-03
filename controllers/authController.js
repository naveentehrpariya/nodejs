const User = require("../db/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_ACCESS = process.env && process.env.SECRET_ACCESS;
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");


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


const login = catchAsync( async (req, res, next) => { 

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


// const current_user = asyncHandle( async (req, res) => {
//     res.json(req.user);
// });

module.exports = {  signup, login  };
