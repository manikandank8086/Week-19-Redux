import express from 'express'
import { UserRegister,UserLogin, UserProfileEdit, UserProfilePic, HomeProfileFetch } from '../Controller/UserLogin.js'
import  upload  from '../utils/multerUtils.js'
import { verifyAccessToken } from '../Jwt/JwtService.js'

const router = express.Router()

router.post('/userRegister', UserRegister)

router.post('/userLogin',UserLogin)

router.post('/UserProfile/:userId',upload.single("profileImage"), UserProfileEdit)

router.post('/UserProfilePic',verifyAccessToken,UserProfilePic)

router.post('/HomeProfileFetch',HomeProfileFetch)





export default router