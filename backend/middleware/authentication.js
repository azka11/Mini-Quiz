const jwt = require("jsonwebtoken");
require('dotenv').config();
const { PrismaClient } = require("@prisma/client");
const cookieParser = require('cookie-parser'); // Add cookie-parser
const prisma = new PrismaClient();

async function authenticateUser(req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.sendStatus(401);
    }
    console.log(token)

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if(!decodedToken || !decodedToken.user_id) {
        return res.sendStatus(401)
    }

    console.log(decodedToken)

    const user_id = decodedToken.user_id;
    const user = await prisma.user.findUnique({ where: { user_id: user_id } });
    
    if (!user) {
      return res.sendStatus(401);
    }

    console.log(user_id)

    req.user = user.user_id

    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.sendStatus(500);
  }

}

async function authenticateAdmin(req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.sendStatus(401);
    }
    console.log(token)

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if(!decodedToken || !decodedToken.admin_id) {
        return res.sendStatus(401)
    }

    console.log(decodedToken)

    const admin_id = decodedToken.admin_id;
    const admin = await prisma.admin.findUnique({ where: { admin_id: admin_id } });
    
    if (!admin) {
      return res.sendStatus(401);
    }

    console.log(admin_id)

    req.admin = admin.admin_id

    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.sendStatus(500);
  }

}

module.exports = { authenticateUser, authenticateAdmin };
