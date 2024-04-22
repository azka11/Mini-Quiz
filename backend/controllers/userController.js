const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt");
require('dotenv').config()

const userController = {
    userLogin: async (req, res) => {
        const {username, password} = req.body
        try {
            const user = await prisma.user.findUnique({where: {username}})
            if (!user) {
                return res.status(400).json({ message: "Invalid credentials" });
              }
              const passwordMatch = await bcrypt.compare(password, user.password);
              if (!passwordMatch) {
                return res.status(400).json({ message: "Invalid credentials" });
              }
              const token = jwt.sign({ user_id: user.user_id }, process.env.JWT_SECRET, { expiresIn: "1d"});

              const currentUser = user.username
              const userId = user.user_id

              res.cookie("token", token, { httpOnly: true, maxAge: 90000000 })
              res.cookie("currentUser", currentUser, { 
                httpOnly: true,
                maxAge: 90000000 
              })
              res.cookie("userId", userId, { 
                httpOnly: true,
                maxAge: 90000000 
              })

              console.log(currentUser)
              console.log(userId)
            //   res.setHeader("Set-Cookie", `token=${ token }; currentUser=${ currentUser }; userId=${userId}; httpOnly; path=/`);
              res.status(200).json({ message: "Login Success", token: token, currentUser: currentUser, userId: userId });
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: "Invalid credentials" });
        }
    },

    userLogout: async (req, res) => {
        try {
            res.clearCookie('token')
            res.clearCookie('currentUser')
            res.clearCookie('userId')

            res.json('logout success')
        } catch (error) {
            console.log(error, `error logout user`)
            res.status(400).json( {message: 'Invalid Credentials'} )
        }
    },

    userRegister: async (req, res) => {
        const {username, email, password} = req.body
        const hashedPassword = await bcrypt.hash(password, 10);
        try {
            const { password: passwordDB, ...user } = await prisma.user.create({data: {
                username,
                email,
                password: hashedPassword
            }
        })
            res.status(201).json({ 
            message: "Succesfully Register!",
            user 
          });
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: "User already exists" });
        }
    },

    getSpecificUser: async (req, res) => {
        try {
          const user_id = req.user
          const user = await prisma.user.findUnique({
            where: { 
            user_id: parseInt(user_id) ,
            }
          });
          res.status(200).json({ message: "Successfully found specific user", user });
        } catch (error) {
          console.log(error);
          res.status(400).json({ message: "User not found" });
        }
    },

    editProfileUser: async (req, res) => {
        const { id } = req.params;
        const { username, email } = req.body
        const image = req.file ? req.file.path : 'default_path_if_file_not_present';
        const photopath = image.replace(/uploads\\/, "uploads/");
        try {
            const user = await prisma.user.update({
                where: {user_id: Number(id)},
                data: {
                    username,
                    email,
                    image: photopath
                }
            })
            res.status(200).json({message: `Succesfully Update user `, user})
        } catch (error) {
            console.log(error);
          res.status(400).json({ message: "User not found" });
        }
    }
}

module.exports = userController;