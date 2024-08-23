import User from "../Database/Model/UserModel.js";
import Admin from "../Database/Model/AdminModel.js";
import { AdmincreateAccessToken } from "../Jwt/JwtService.js";

const AdminLogin = async (req, res) => {
  try {
    console.log("working admin login");

    const { email, password } = req.body;

    console.log("Email:", email);
    console.log("Password:", password);

    const adminEmail = "admin@gmail.com";
    const adminPassword = "123456";

    if (email !== adminEmail) {
      return res.status(409).json({
        status: false,
        error: "email",
        message: "Wrong Email",
      });
    }
    if (password !== adminPassword) {
      return res.status(409).json({
        status: false,
        error: "password",
        message: "Wrong Password",
      });
    }
   
    const username= 'admin'
    const Id='66c6338d630effbeb461a125'

    const accessToken =  await AdmincreateAccessToken(username,email,Id)
    const AdminData = {
        username: username,
        email: email,
        id: Id,
      };

    
    res.status(200).json({
      status: true,
      adminData:AdminData,
      accessToken:accessToken,
      message: "Login successful",
    });
  } catch (error) {
    console.error("Error:", error);

    res.status(500).json({
      status: false,
      error: "server",
      message: "Internal Server Error",
    });
  }
};

const AdminHome = async (req, res) => {
  try {
    console.log("working adminGet");
    const userData = await User.find();
    console.log("userData is " + userData);
    if (userData) {
      res.status(200).json({ status: true, userData: userData });
    } else {
      res.status(205).json({ status: false });
    }
  } catch (error) {
    console.log("error");
    console.log(error);
  }
};

const DeleteUser = async (req, res) => {
  try {
    console.log("working delete function");
    const userId = req.params.userId;
    const DeleteUser = await User.deleteOne({ _id: userId });
    console.log("result is " + DeleteUser);

    if (DeleteUser) {
      console.log("working");
      res.status(200).json({ status: true });
    } else {
      res.status(205).json({ status: false });
    }

    console.log(console.log("id is fsdfsf     " + userId));
  } catch (error) {
    console.log("error occur" + error);
  }
};

const CreateUser = async (req, res) => {
  try {
    console.log("working " + req.body);
    const { username, email, phone, password } = req.body;
    console.log("user" + username, email, phone, password);

    const Userdata = await User.findOne({ email: email });

    if (!Userdata) {
      const user = await User.create({
        username: username,
        email: email,
        phoneNumber: phone,
        password: password,
      });

      if (user) {
        console.log("fetch perfect working");
        return res.status(200).json({ status: true });
      } else {
        return res.status(400).json({ status: false });
      }
    } else {
      console.log("user exist");
      return res
        .status(409)
        .json({ status: false, message: "User Already Exist" });
    }
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ error: "Internal server Error" });
  }
};

const SearchUser = async (req, res) => {
  try {
    console.log("working search");
    const searchQuery = req.params.searchQuery;
    console.log("search query is " + searchQuery);

    const result = await User.find({
      $or: [
        { username: { $regex: `^${searchQuery}`, $options: "i" } },
        { email: { $regex: `^${searchQuery}`, $options: "i" } },
        { phoneNumber: { $regex: `^${searchQuery}`, $options: "i" } },
      ],
    });

    if (result.length > 0) {
      console.log("data got it");
      res.status(200).json({ status: true, result });
    } else {
      res
        .status(200)
        .json({ status: false, message: "No users found", result: [] });
    }
  } catch (error) {
    console.log("error" + error);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};

const EditGet = async (req, res) => {
  try {
    console.log('working edit Get')
    const userId = req.params.id
    console.log('id is '+ userId)

    const userData=await User.findOne({_id:userId})
    if(userData){
        console.log('user data '+ userData)
        res.status(200).json({status:true,userData:userData})
    }else{
        res.status(409).json({status:false,message:'Cannot find User Id'})
    }
  } catch (error) {
    console.log("errro occur " + error);
    res.status(500).json({error:'Internal Server Error'})
  }
};


const EditUpdate=async(req,res)=>{
    try{
        console.log('working edit user')
         const {username,email,phone}= req.body
         console.log(username,email,phone)
         const userId=req.params.userId
         console.log('user id '+ userId)

           const updateUser=await User.updateOne({_id:userId},
            {
                $set:{
              username:username,
              email:email,
              phoneNumber:phone
           }})

            if(updateUser){
                console.log('sucess')
                console.log(updateUser)
                res.status(200).json({status:true})
            }else{
                res.status(409).json({status:false})
            }

    }catch(error){
        console.log('error occur'+ error)
    }
}

export { AdminLogin, AdminHome, DeleteUser, CreateUser, SearchUser,EditGet,EditUpdate };
