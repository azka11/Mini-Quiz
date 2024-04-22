const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt");
require('dotenv').config()

const adminController = {
    adminLogin: async (req, res) => {
        const {name, password} = req.body
        try {
            const admin = await prisma.admin.findUnique({where: {name}})
            if (!admin) {
                return res.status(400).json({ message: "Invalid credentials" });
              }
              const passwordMatch = await bcrypt.compare(password, admin.password);
              if (!passwordMatch) {
                return res.status(400).json({ message: "Invalid credentials" });
              }
              const token = jwt.sign({ admin_id: admin.admin_id }, process.env.JWT_SECRET, { expiresIn: "1d"});

              const currentAdmin = admin.name
              const adminId = admin.admin_id

              res.cookie("token", token, { httpOnly: true, maxAge: 90000000 })
              res.cookie("currentAdmin", currentAdmin, { 
                httpOnly: true,
                maxAge: 90000000 
              })
              res.cookie("adminId", adminId, { 
                httpOnly: true,
                maxAge: 90000000 
              })

              console.log(currentAdmin)
              console.log(adminId)
            //   res.setHeader("Set-Cookie", `token=${ token }; currentUser=${ currentUser }; userId=${userId}; httpOnly; path=/`);
              res.status(200).json({ message: "Login Success", token: token, currentAdmin: currentAdmin, adminId: adminId });
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: "Invalid credentials" });
        }
    },

    adminLogout: async (req, res) => {
        try {
            res.clearCookie('token')
            res.clearCookie('currentAdmin')
            res.clearCookie('adminId')

            res.json('logout success')
        } catch (error) {
            console.log(error, `error logout admin`)
            res.status(400).json( {message: 'Invalid Credentials'} )
        }
    },

    adminRegister: async (req, res) => {
        const {name, email, password} = req.body
        const hashedPassword = await bcrypt.hash(password, 10);
        try {
            const { password: passwordDB, ...user } = await prisma.admin.create({data: {
                name,
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

    getSpecificAdmin: async (req, res) => {
        try {
          const admin_id = req.admin
          const admin = await prisma.admin.findUnique({
            where: { 
            admin_id: parseInt(admin_id) ,
            }
          });
          res.status(200).json({ message: "Successfully found specific user", admin});
        } catch (error) {
          console.log(error);
          res.status(400).json({ message: "User not found" });
        }
    },

    editProfileAdmin: async (req, res) => {
        const { id } = req.params;
        const { name, email } = req.body
        const image = req.file ? req.file.path : 'default_path_if_file_not_present';
        const photopath = image.replace(/uploads\\/, "uploads/");
        try {
            const admin = await prisma.admin.update({
                where: {admin_id: Number(id)},
                data: {
                    name,
                    email,
                    image: photopath
                }
            })
            res.status(200).json({message: `Succesfully Update user `, admin})
        } catch (error) {
            console.log(error);
          res.status(400).json({ message: "User not found" });
        }
    }
}

module.exports = adminController;