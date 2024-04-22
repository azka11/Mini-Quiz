const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const questionController = {
    findAllQuestion: async (req, res) => {
        try {
            const question = await prisma.question.findMany()
            res.status(200).json({ message: "Successfully found question", question})
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: "Questions not found" });
        }
    },

    
    findQuestionById: async (req, res) => {
        const { id } = req.params
        try {
            const question = await prisma.question.findUnique({
                where: {question_id: Number(id)}
            })
            res.status(200).json({ message: "Successfully found question", question})
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: "Questions not found" });
        }
    },

    findQuestionByAdmin: async (req, res) => {
        const admin_id = req.admin
        try {
            const question = await prisma.question.findMany({
                where: { admin_id: Number(admin_id) },
                include: {
                    admin: {
                        select: {
                            name: true
                        }
                    },
                    category: {
                        select: {
                            category_name: true
                        }
                    }
                }
            })
            res.status(200).json({ message: "Successfully found question", question})
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: "Questions not found" });
        }
    },
    
    findQuestionByCategory: async (req, res) => {
        const { category_id } = req.params
        try {
            const question = await prisma.question.findMany({
                where: {category_id: Number(category_id)}
            })
            res.status(200).json({ message: "Successfully found question by category", question})
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: "Questions not found" });
        }
    },

    createQuestion: async (req, res) => {
        const {category_name, question_text, correct_answer} = req.body
        const admin_id = req.admin
        try {
            const category = await prisma.category.findFirst({
                where: {
                    category_name: category_name
                }
            })

            const question = await prisma.question.create({
                data:{
                    admin_id,
                    category_id: category.category_id,
                    question_text,
                    correct_answer
                }
            })
            res.status(200).json({ message: "Successfully create question", question})
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: "Failed to create question" });
        }
    },

    updateQuestion: async (req, res) => {
        const { id } = req.params
        const {category_id, question_text, correct_answer} = req.body
        const admin_id = req.admin
        try {
            const question = await prisma.question.update({
                where: {question_id: Number(id)},
                data:{
                    admin_id,
                    category_id,
                    question_text,
                    correct_answer
                }
            })
            res.status(200).json({ message: "Successfully update question", question})
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: "Failed to update question" });
        }
    },

    deleteQuestion: async (req, res) => {
        const { id } = req.params
        try {
            question = await prisma.question.delete({
                where: {question_id: Number(id)}
            })
            res.status(200).json({message: "Successfully Delete Questions"})
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: "Failed to delete Questionst" });
        }
    }
}

module.exports = questionController;