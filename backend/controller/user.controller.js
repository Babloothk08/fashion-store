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

    if (!email || !newPassword) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.resetOTP || user.resetOTPExpiry) {
      return res.status(400).json({ message: "OTP not verified yet" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    return res.status(200).json({ message: "Password reset successful ✔" });

  } catch (error) {
    console.log("Reset password error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};


  



export const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    console.log("Forgot password email:", email);

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Email not found" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log("Generated OTP:", otp);

    user.resetOTP = otp;
    user.resetOTPExpiry = Date.now() + 5 * 60 * 1000;
    await user.save();

    console.log("EMAIL_USER:", process.env.EMAIL_USER);
    console.log("EMAIL_PASS exists:", !!process.env.EMAIL_PASS);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.verify(); // 🔥 THIS WILL TELL EXACT ERROR
    console.log("Transporter verified");

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP is ${otp}. It expires in 5 minutes.`,
    });

    return res.status(200).json({ message: "OTP sent successfully" });

  } catch (error) {
    console.error("SEND OTP ERROR ⛔", error);
    return res.status(500).json({ message: "OTP sending failed" });
  }
};




export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "User not found" });

    if (
      user.resetOTP !== otp ||
      user.resetOTPExpiry < Date.now()
    ) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    return res.status(200).json({
      message: "OTP verified successfully ✔",
    });

  } catch (error) {
    console.log("Verify OTP Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};



