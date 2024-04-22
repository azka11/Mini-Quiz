const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const categoryController = {
    findAllCategory: async (req, res) => {
        try {
            const category = await prisma.category.findMany()
            res.status(200).json({ message: "Successfully found category", category})
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: "category not found" });
        }
    },

    createCategory: async (req, res) => {
        const { category_name } = req.body
        const admin_id = req.admin
        try {
            const category = await prisma.category.create({
                data: {
                    admin_id,
                    category_name
                }
            })
            res.status(200).json({ message: "Successfully create category", category})
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: "Failed create category" });
        }
    },

    updateCategory: async (req, res) => {
        const { id } = req.params
        const { category_name } = req.body
        const admin_id = req.admin
        try {
            const category = await prisma.category.update({
                where: {category_id: Number(id)},
                data: {
                    admin_id,
                    category_name
                }
            })
            res.status(200).json({ message: "Successfully update category", category})
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: "Failed update category" });
        }
    },

    deleteCategory: async (req, res) => {
        const { id } = req.params
        try {
            category = await prisma.category.delete({
                where: {category_id: Number(id)}
            })
            res.status(200).json({message: "Successfully Delete Questions"})
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: "Failed to delete Questionst" });
        }
    }
}

module.exports = categoryController