  import { User } from "../models/model.User.js";
  import bcrypt from 'bcrypt'
  import nodemailer from "nodemailer";

  export const registerUser = async (req, res) => {
    const { name, lastName, email, password, role } = req.body;
    // console.log("Bdata", req.body);

    try {
      if (!name || !lastName || !email || !password) {
        return res.status(400).json({ message: "Invalid inputs, please fill all details" });
        // console.log("name", name);
        
      }
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already registered, go to the Sign-In page" });
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      //save the user with hashPassword
      

      const NewUser = await User.create({
        name,
        lastName,
        email,
        password : hashedPassword,
        role : "user"
      });

      const user = await User.findById(NewUser._id).select("-password, -__v")
      // console.log(user);
      

      res.status(200).json({ message: "User registered successfully", data:user });
      
    } catch (error) {
      console.log("wrong output", error);
      res.status(500).json({ message: "server error" });
    }
  };

  export const AccessAndRefreshToken = async(userId)=> {
    const user = await User.findById(userId)
    if(!user)throw new Error ("User not found for token creation")


    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken
    await user.save({validateBeforeSave : false})

    return { accessToken, refreshToken}
  }

  export const loggedIn = async (req, res)=> {
    try {
      const {email , password } = req.body
      console.log("res",req.body);
      
      if(!email || !password){
        res.status(400).json({message : "please field all the details"})
      }
      const user = await User.findOne({email})
        if(!user){
          res.status(404).json({message : "user not found, do registration"})
        }
        console.log("user",user);
        
      const isPasswordValid = await bcrypt.compare(password, user.password)
      if(!isPasswordValid){
        res.status(404).json({message : "Incorrect password"})
      }
  
      const {accessToken , refreshToken } = await AccessAndRefreshToken(user._id)
      
      //send cookies with tokens
      const cookieOptions = {
        httpOnly : true,
        secure : process.env.NODE_ENV === "production",  //only HTTPS
        sameSite : "strict", 
        maxAge : 3 * 24 * 60 * 60 * 1000, // 3 days in milliseconds
      };
      return res.status(200).json({ 
        message : "Login Successfull",
        user : {
          id : user._id,
          email : user.email,
          name : user.name,
          role : user.role,
        },
        accessToken,
        refreshToken
        
        
      })
    } catch (error) {
      console.log(error);
      return res.status(500).json({message : "Server error "})
    };
    }




// const createAccessToken = (payload) => {
//   return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
//     expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || "15m",
//   });
// };

// const createRefreshToken = (payload) => {
//   return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
//     expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || "7d",
//   });
// };

// LOGIN - issues access + refresh token and sets refresh token in HttpOnly cookie
// export const loggedIn = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const existingUser = await User.findOne({ email }).select("+password"); // if password field is select:false in schema
//     if (!existingUser) {
//       return res.status(400).json({ message: "User not registered" });
//     }

//     const isMatch = await bcrypt.compare(password, existingUser.password);
//     if (!isMatch) {
//       return res.status(401).json({ message: "Incorrect password" });
//     }

//     // Prepare payload (do not include sensitive fields)
//     const payload = { id: existingUser._id, email: existingUser.email, role: existingUser.role };

//     // Create tokens
//     const accessToken = createAccessToken(payload); // short lived
//     const refreshToken = createRefreshToken(payload); // long lived

//     // Save refresh token in DB (helps revoke/rotate)
//     existingUser.refreshToken = refreshToken;
//     await existingUser.save();

//     // Cookie options
//     const isProd = process.env.NODE_ENV === "production";
//     const cookieOptions = {
//       httpOnly: true,
//       // secure should be true in production (HTTPS). In development you might keep it false.
//       secure: isProd,
//       sameSite: isProd ? "None" : "Lax", // If front-end on different origin use "None" + secure
//       maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days (ms) - match refresh expiry roughly
//     };

//     // Set HttpOnly cookie with refresh token
//     res.cookie("refreshToken", refreshToken, cookieOptions);

//     // Send response WITHOUT password or refresh token as JSON
//     const userToSend = {
//       id: existingUser._id,
//       name: existingUser.name,
//       email: existingUser.email,
//       role: existingUser.role,
//       // include other public fields as required
//     };

//     return res.status(200).json({
//       message: "Sign-in successful",
//       data: userToSend,
//       accessToken, // client will store in memory/Redux or use it in Authorization header
//     });
//   } catch (error) {
//     console.error("Login error:", error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };

// REFRESH TOKEN endpoint - issue a new access token (and optionally rotate refresh token)
// export const refreshToken = async (req, res) => {
//   try {
//     const tokenFromCookie = req.cookies?.refreshToken;
//     if (!tokenFromCookie) {
//       return res.status(401).json({ message: "No refresh token provided" });
//     }

//     // verify refresh token
//     let payload;
//     try {
//       payload = jwt.verify(tokenFromCookie, process.env.REFRESH_TOKEN_SECRET);
//     } catch (err) {
//       return res.status(403).json({ message: "Invalid refresh token" });
//     }

//     // optional: verify token matches user's stored refresh token (prevents reuse after logout)
//     const dbUser = await User.findById(payload.id);
//     if (!dbUser || dbUser.refreshToken !== tokenFromCookie) {
//       return res.status(403).json({ message: "Refresh token revoked" });
//     }

//     // Create new access token
//     const newAccessToken = createAccessToken({ id: dbUser._id, email: dbUser.email, role: dbUser.role });

//     // Optionally rotate refresh token (recommended)
//     const newRefreshToken = createRefreshToken({ id: dbUser._id, email: dbUser.email, role: dbUser.role });
//     dbUser.refreshToken = newRefreshToken;
//     await dbUser.save();

//     // update cookie
//     const isProd = process.env.NODE_ENV === "production";
//     res.cookie("refreshToken", newRefreshToken, {
//       httpOnly: true,
//       secure: isProd,
//       sameSite: isProd ? "None" : "Lax",
//       maxAge: 1000 * 60 * 60 * 24 * 7,
//     });

//     return res.status(200).json({ accessToken: newAccessToken });
//   } catch (error) {
//     console.error("Refresh token error:", error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };


// LOGOUT - clears cookie and removes refresh token from DB

// export const logoutUser = async (req, res) => {
//   try {
//     const tokenFromCookie = req.cookies?.refreshToken;
//     if (tokenFromCookie) {
//       // Try to find user and clear refresh token
//       try {
//         const payload = jwt.verify(tokenFromCookie, process.env.REFRESH_TOKEN_SECRET);
//         await User.findByIdAndUpdate(payload.id, { $unset: { refreshToken: 1 } });
//       } catch (err) {
//         // ignore verification errors here — proceed to clear cookie anyway
//       }
//     }

//     // clear cookie on client
//     res.clearCookie("refreshToken", {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
//     });

//     return res.status(200).json({ message: "Logged out" });
//   } catch (error) {
//     console.error("Logout error:", error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };





  


  export const getProfile = async(req, res)=>{
    const id = req.user._id

    if(!id){
      return res.status(401).json("ID is not valid")
    }

    const userDetails = await User.findById(id);

    if(!userDetails){
      return res.status(400).json(" user Details not found")
    }

    res.status(200).json({
      data: userDetails,
      message:" user fetch successful"
    })

  }


  export const updateProfile = async(req, res) => {
    try {
      const id = req.user._id
      console.log(id)
      const {name, lastName, email, password, address, mobile} = req.body
      console.log(req.body)

      let updateData = {name , lastName, email, password, address, mobile}
      if(password) {
        const saltRounds = 10;
        updateData.password = await bcrypt.hash(password, saltRounds);
      }
  
      const updatedUser = await User.findByIdAndUpdate(
        id,
        updateData,
        {new : true}  
      );

      if (!updatedUser){
        return res.status(400).json("user not found")
      }
      console.log(updatedUser)

      res.status(200).json({
        data : updatedUser,
        message : "profile updated successfully"
      });
      
    } catch (error) {
      res.status(500).json("something went wrong");
    }
  };


  export const logoutUser = async(req, res) => {
    try {
      if(!req.user || !req.user._id){
        return res.status(401).json({message : "Unauthorized - no user found"});
      }
      await User.findByIdAndUpdate(
        req.user._id,
        { $unset: {token : 1}},
        { new : true}
      );
      return res.status(200).json({message : "User Logged out successfully" });
    } catch (error) {
      console.error("Logout Error :", error);
      return res.status(500).json({ message : "Server error during logout"})
    }
  };





// Reset Password
export const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const saltRounds = 10;
    user.password = await bcrypt.hash(newPassword, saltRounds);
    user.resetOTP = undefined;
    user.resetOTPExpiry = undefined;
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.log("Reset password error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

  



export const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "Email not found" });

    // Generate 6 digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Save OTP with expiry (5 minutes)
    user.resetOTP = otp;
    user.resetOTPExpiry = Date.now() + 5 * 60 * 1000;
    await user.save();

    // Mail transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS.replace(/\s/g, ""),
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP is ${otp}. It expires in 5 minutes.`,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.log("OTP Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};



export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "User not found" });

    // OTP invalid?
    if (
      user.resetOTP !== otp ||
      user.resetOTPExpiry < Date.now()
    ) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Generate new random password
    const newPassword = Math.random().toString(36).slice(-8);

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // Save new data
    user.password = hashedPassword;
    user.resetOTP = undefined;
    user.resetOTPExpiry = undefined;
    await user.save();

    // Send email with new password
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS.replace(/\s/g, ""),
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your New Password",
        html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #222;">

      <p>Hi <strong>${user.name}</strong>,</p>
    </div>
  `
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      message: "OTP verified. New password sent to email ✔",
    });

  } catch (error) {
    console.log("Verify OTP Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// export const userProfile = await User.aggregate([
//       { $match: { _id: new mongoose.Types.ObjectId(userId) } },
//       {
//         $lookup: {
//           from: "addresses", // make sure this matches your addresses collection name
//           localField: "_id",
//           foreignField: "userId",
//           as: "addresses",
//           pipeline: [
//             {
//               $project: {
//                 _id: 0,         // optional, remove _id from address objects
//                 fullName: 1,
//                 state: 1,
//                 city: 1,
//                 address: 1,
//                 phone: 1,
//                 pinCode: 1,
//               },
//             },
//           ],
//         },
//       },
//       {
//         $project: {
//           _id: 0,
//           fullName: 1,
//           email: 1,
//           createdAt: 1,
//           updatedAt: 1,
//           addresses: 1,
//         },
//       },
//     ]);