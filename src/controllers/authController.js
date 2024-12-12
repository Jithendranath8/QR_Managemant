const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { authenticateUser,registerUser } = require("../services/authServices");

const register = async(req, res, next)=>{
    try{
        const {name, email, password} = req.body; 
        const create = await registerUser(name, email, password);
        res.status(201).json(create)
    }catch(e){
        next(e)
    }
}

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const token = await authenticateUser(email, password);
    res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
};

const getProfile = (req, res) => {
  res.status(200).json(req.user);
};

module.exports = { login, getProfile, register };
