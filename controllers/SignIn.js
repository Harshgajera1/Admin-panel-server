const signInModel = require('../modals/SignInModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const signIn = async (req, res) => {
    console.log(req.body)
    const email = req.body.email;
    const password = req.body.password;
  
    try {
      const user = await signInModel.findOne({ email: email });
      if (!user) {
        const hash = await bcrypt.hash(password, 10);
        const newUser = new signInModel({
          email: email,
          password: hash,
        });
        await newUser.save();
        res.status(200).json({ msg: "Sign in successful." })
      } else {
        res.status(409).json({ msg: "Email already exist." })
      }
    } catch (err) {
      res.status(500).send(err)
      console.log(err)
    }
  }

  const login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
  
    try {
      const user = await signInModel.findOne({ email: email });
      if (user) {
        const response = await bcrypt.compare(password, user.password);
        if (response) {
  
          const payload = {
            nameemail : email
          }
          const token = jwt.sign(payload,process.env.JWT_SECRET_KEY,{expiresIn: '1h'})
  
          res.status(200).send({msg: "Login Sucessful.",token})
        } else {
          res.status(401).json({ msg: "Email or password is wrong."})
        }
      } else {
        res.status(404).json({ msg: "User not exist."})
      }
    } catch (err) {
      res.status(500).send(err)
      console.log(err)
    }
  
  }


  module.exports = {
    signIn,
    login
  }
