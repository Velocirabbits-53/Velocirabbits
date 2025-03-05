// import { router } from "../routers/routers";
// import {Express, NextFunction} from "express";
import { User } from "../models/users";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AuthController} from "../types";

const authenticationController: AuthController = { 
  login: async (req, res, next) => {
    console.log("🔐 Login controller reached!");
    const { password, username } = req.body;
    User.findOne({ username })
      .then((user) => {
        if (!user) {
          console.log('🤔 User.findOne has exited early!')
          throw {
            log: 'Incorrect username in authenticationController',
            status: 400,
            message: { error: 'Incorrect Username.' },
          }
        }
        return bcrypt.compare(password, user.password).then((matched)=>({user, matched}))
      })
      .then(({user, matched}) => {
        if (!matched) {
          console.log(`🛂 bcrypt.compare gave us something we didn't like.`)
          throw {
            log: "Incorrect password in authenticationController",
            status: 400, 
            message: { error: "Incorrect Password" }
          }
        }
      if (!process.env.JWT_SECRET) {
        console.log('💀 JWT secret seems to be missing!')
        throw {
          log: "JWT secret is not defined",
          status: 400, 
          message: { error: "Internal Server Error" }
        }
      }
    const payload = { userId: user._id }
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "0.25hr" });
    return res.status(200).json({ message: "logged in", token })
    // return next()
    })
    .catch((error) => {
      return next(error);
    });
  },
  register: async (req, res, next) => {
    console.log('🛂 Registration controller reached!');
    const { username, password } = req.body;
    console.log("The value of the req.body.username is ", req.body.username);
    console.log("The value of the req.body.password is ", req.body.password);
    User.findOne({ username: username })
      .then((userExists) => {
        if(userExists) {
          throw {
            log: 'Already existing username in authenticationController',
            status: 400,
            message: { error: 'User already exists' },
          }
        }
        return bcrypt.genSalt(6)
      })
      .then((salt) => { 
        return bcrypt.hash(password, salt) 
      })
      .then((hashedPassword)=> {
        const newUser = new User({
          username: username,
          password: hashedPassword,
        })
        return newUser.save()
      })
      .then(() => {
        // return is allowed here cuz we're done yay
        return res.status(200).json({ message: "Thank you" });
      })
      .catch((error) => {
        return next(error);
      })
    }
  }

  export { authenticationController }
  
  // try {
    //   const { username, password } = req.body;
    //   console.log("The value of the req.body.username is", req.body.username);
    //   console.log("The value of the req.body.password is", req.body.password);
    //   const userExists = await User.findOne({ username: username });
    //   if (userExists) {
    //     return res.status(400).json({ message: "User already exists" });
    //   }
    //   console.log("we are here");
    //   const salt = await bcrypt.genSalt(6);
    //   const hashedPassword = await bcrypt.hash(password, salt);
    //   const newUser = new User({
    //     username: username,
    //     password: hashedPassword,
    //   });
    //   console.log(newUser);
    //   await newUser.save();
    //   res.status(200).json({ message: "Thank you" });
    //   return next();
    // } catch (error) {
    //   console.error(error);
    //   res.status(500).json({ message: "error" });
    // }

  //   try {
  //     console.log("we have reached the login controller");

  //     const { password, username } = req.body;
  //     if (!username) {
  //       return res.status(400).json({ message: "incorrect username" });
  //     }
  //     const user = await User.findOne({ username: username });
  //     if (user) {
  //       const matched = await bcrypt.compare(password, user.password);
  //     }
  //     if (!matched) {
  //       return res.status(400).json({ message: "incorrect password" }); 
  //     }
  //     const payload = { userId: user._id };

  //     const token = jwt.sign(payload, process.env.JWT_SECRET, {
  //       expiresIn: "0.25hr",
  //     });

  //     res.status(200).json({ message: "logged in", token });

  //     return next();
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ message: "error" });
  //   }
  // },

  
// authenticationController.login = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     console.log("we have reached the login controller");

//     const { password, username } = req.body;
//     const user = await User.findOne({ username: username });
//     if (!username) {
//       return res.status(400).json({ message: "incorrect username" });
//     }

//     // if (password !== user.password) {
//     //   return res.status(400).json({ message: "incorrect password" });
//     // }

//     const matched = await bcrypt.compare(password, user.password);
//     if (!matched) {
//       return res.status(400).json({ message: "incorrect password" });
//     }
//     const payload = { userId: user._id };

//     const token = jwt.sign(payload, process.env.JWT_SECRET, {
//       expiresIn: "0.25hr",
//     });

//     res.status(200).json({ message: "logged in ", token });

//     return next();
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "error" });
//   }
// };

// authenticationController.register = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const { username, password } = req.body;
//     console.log("The value of the req.body.username is", req.body.username);
//     console.log("The value of the req.body.password is", req.body.password);
//     const userExists = await User.findOne({ username: username });
//     if (userExists) {
//       return res.status(400).json({ message: "User already exists" });
//     }
//     console.log("we are here");
//     const salt = await bcrypt.genSalt(6);
//     const hashedPassword = await bcrypt.hash(password, salt);
//     const newUser = new User({
//       username: username,
//       password: hashedPassword,
//     });
//     console.log(newUser);
//     await newUser.save();
//     res.status(200).json({ message: "Thank you" });
//     return next();
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "error" });
//   }
// };

