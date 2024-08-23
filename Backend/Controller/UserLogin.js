import cloudinary from '../configs/cloudinaryConfig.js';
import User from '../Database/Model/UserModel.js';
import { createAccessToken } from '../Jwt/JwtService.js';
import formidable from "formidable";
const UserRegister = async (req, res) => {
    console.log('working');
    try {
        console.log('sssss');
        console.log(req.body);

        const email = req.body.email;
        console.log('email is ' + email);
        console.log('phone number is '+ req.body.phoneNumber)
        const userEmail = await User.findOne({ email: email });
        console.log('user mail is matched', userEmail);
             console.log(userEmail)
        if (!userEmail) {
            const user = await User.create({
                username: req.body.name,
                email: req.body.email,
                password: req.body.password,
                phoneNumber:req.body.phoneNumber
            });
        
            const Id=user._id
            const username=user.username
            const accessToken =  await createAccessToken(username,email,Id)
            console.log('accedd'+ accessToken)
            return res.status(201).json({ status: true, user: user ,accessToken:accessToken});
        }
        return res.status(409).json({ status: false, message: 'User Exists' });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, message: 'Internal Server Error' });
    }
};


const UserLogin = async (req, res) => {
    try {
        console.log('working userLogin');
        const { email, password } = req.body;
        console.log(email)
        const userData = await User.findOne({ email: email });

        if (userData) {
            
            if (userData.password === password) {
                const {password , ...user} = userData._doc
                console.log(user)
                const username = userData.username
                const Id=userData._id
                console.log('user id '+ Id)
                const accessToken =  await createAccessToken(username,email,Id)

                return res.status(200).json({ status: true, user: userData,accessToken:accessToken });
            } else {
                return res.status(400).json({ status: false, message: 'Password does not match' });
            }
        } else {
            return res.status(409).json({ status: false, message: "Cannot find User" });
        }

    } catch (error) {
        res.status(500).json({ Error: "Internal Server Error" });
        console.log(error);
    }
};


const UserProfileEdit = async (req, res) => {
    try {
        console.log('working profile');
        const { name, phoneNumber } = req.body;
        const { userId } = req.params;
        const profileImage = req.file ? req.file.path : null;
        console.log(profileImage);

        let result = null;

        if (profileImage) {
            result = await cloudinary.uploader.upload(profileImage);
            console.log(result);
            console.log(result.secure_url);
        }

        const updateFields = {
            username: name,
            phoneNumber: phoneNumber,
        };

        if (result) {
            updateFields.image = {
                url: result.secure_url,
                public_id: result.public_id,
            };
        }

        

        const user = await User.findByIdAndUpdate(userId, updateFields, { new: true, upsert: true }).select("-password");

        res.status(200).json({status:true,user:user});

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while updating the profile' });
    }
};


const UserProfilePic= async(req,res)=>{
    try{
        console.log('working user pic change')
        const userId = req.body.userId
        console.log('userID is '+ userId)

        const userData = await User.find({_id:userId})
        console.log('user data is '+ userData)

        res.status(200).json({status:true,userData:userData})

    }catch(error){
        res.status(500).json({error:'Internal Serverr Error'})
        console.log(error)
    }
}


const HomeProfileFetch=async(req,res)=>{
    try{
        console.log('working homepagePrfile')
        const userId= req.body.userId
        const userData = await User.findOne({_id:userId})
        console.log(userData?true:false)
        console.log(userData)

           if(userData){
             res.status(200).json({status:true,userData:userData})
           }

    }catch(error){
        console.log(error)
        res.status(500).json({error:'Internal Server Error'})
    }
}


export {UserRegister,
    UserLogin,
    UserProfileEdit,
    UserProfilePic,
    HomeProfileFetch
}
