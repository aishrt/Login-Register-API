let usermodel = require("../model/model");

let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");
JWT_SECRET_KEY = "dhsjf3423jhsdf3423df";

//register
module.exports.userRegistration = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body.userDetail;
  // const { name, email, password , confirmPassword} = req.body;

  const user = await usermodel.findOne({ email: email });
  if (user) {
    res.send({ status: "failed", message: "Email already exists" });
  } else {
    if (name && email && password && confirmPassword) {
      if (password === confirmPassword) {
        try {
          const salt = await bcrypt.genSalt(10);
          const hashPassword = await bcrypt.hash(password, salt);
          const doc = new usermodel({
            name: name,
            email: email,
            password: hashPassword,
            confirmPassword: confirmPassword,
            userRole: "client",
          });
          await doc.save();
          const saved_user = await usermodel.findOne({ email: email });
          // Generate JWT Token
          const token = jwt.sign({ userID: saved_user._id }, JWT_SECRET_KEY, {
            expiresIn: "5d",
          });
          res.status(201).send({
            status: "success",
            message: "Registration Successufll",
            token: token,
          });
        } catch (error) {
          console.log(error);
          res.send({ status: "failed", message: "Unable to Register" });
        }
      } else {
        res.send({
          status: "failed",
          message: "Password and Confirm Password doesn't match",
        });
      }
    } else {
      res.send({ status: "failed", message: "All fields are required" });
    }
  }
};

// login

module.exports.userLogin = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;
    if (email && password) {
      // debugger;
      const user = await usermodel.findOne({ email: email });
      console.log("userrr", user);
      if (user != null) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (user.email === email && isMatch) {
          // Generate JWT Token
          const token = jwt.sign({ userID: user._id }, JWT_SECRET_KEY, {
            expiresIn: "5d",
          });
          res.send({
            status: "success",
            message: "Yess! Authentication Successfull",
            token: token,
            user: user,
          });
        } else {
          res.send({ status: "failed", message: "Incorrect Password !" });
        }
      } else {
        res.send({
          status: "failed",
          message: "You are not a Registered User",
        });
      }
    } else {
      res.send({ status: "failed", message: "All Fields are Required" });
    }
  } catch (error) {
    console.log(error);
    res.send({ status: "failed", message: "Unable to Login" });
  }
};
