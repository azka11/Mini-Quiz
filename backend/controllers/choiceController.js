const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const multipleChoiceController = {

    findAllChoice: async (req, res) => {
        try {
            const choice = await prisma.multipleChoice.findMany()
            res.status(200).json({ message: "Successfully find multiple choice", choice})
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: "Failed find multiple choice" });
        }
    },

    findChoiceByQuestion: async (req, res) => {
        const { question_id } = req.params
        try {
            const choice = await prisma.multipleChoice.findMany({
                where: {question_id: Number(question_id)}
            })
            res.status(200).json({ message: "Successfully find multiple choice", choice})
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: "Failed find multiple choice" });
        }
    },

    createChoice: async (req, res) => {
        const {question_text, choice_answer} = req.body
        const admin_id = req.admin
        try {
            const question = await prisma.question.findFirst({
                where: {
                    question_text: question_text
                }
            })

            const choice = await prisma.multipleChoice.create({
                data: {
                    admin_id,
                    question_id: question.question_id,
                    choice_answer
                }
            })
            res.status(200).json({ message: "Successfully create multiple choice", choice})
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: "Failed create multiple choice" });
        }
    },

    updateChoice: async (req, res) => {
        const { id } = req.params
        const {question_id, choice_answer} = req.body
        const admin_id = req.admin
        try {
            const choice = await prisma.multipleChoice.update({
                where: {choice_id: Number(id)},
                data: {
                    admin_id,
                    question_id,
                    choice_answer
                }
            })
            res.status(200).json({ message: "Successfully update multiple choice", choice})
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: "Failed update multiple choice" });
        }
    },

    deleteChoice: async (req, res) => {
        const { id } = req.params
        try {
            choice = await prisma.multipleChoice.delete({
                where: {choice_id: Number(id)}
            })
            res.status(200).json({message: "Successfully Delete Choice"})
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: "Failed to delete Choice" });
        }
    }
}

module.exports = multipleChoiceController;