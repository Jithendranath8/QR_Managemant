const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const registerUser = async (name, email, password)=>{
    const user = await prisma.user.findUnique({ where: { email } }); 
    if(user){
        throw new Error("User Already Exists")
    }
    const hashed = await bcrypt.hash(password, 10); 
    const create = await prisma.user.create({data: {name, email, password: hashed}})
    return create
}

const authenticateUser = async (email, password) => {
  const user = await prisma.user.findUnique({ where: { email } });
  console.log(user)
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error("Invalid email or password.");
  }
  return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

module.exports = { authenticateUser, registerUser };
