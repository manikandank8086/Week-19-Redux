import express from "express";
import { AdminHome, AdminLogin, CreateUser, DeleteUser, EditGet, EditUpdate, SearchUser } from "../Controller/AdminControll.js";
import { AdminverifyAccessToken } from "../Jwt/JwtService.js";

const router = express.Router()


router.post('/AdminLogin',AdminLogin)

router.get('/AdminHomeGet',AdminHome)

router.get('/DeleteUser/:userId',DeleteUser)

router.post('/CreateUser',CreateUser)

router.get('/SearchUser/:searchQuery',SearchUser)

router.get('/EditGet/:id',EditGet)

router.post('/EditUpdate/:userId',EditUpdate)




export default router