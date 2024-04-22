const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const userAnswerController = {
    findAnswer: async (req, res) => {
        const user_id = req.user

        try {
            const answer = await prisma.userAnswer.findMany({
                where: {user_id: Number(user_id)},
                include: {
                    multipleChoice: {
                        select: {
                            choice_answer: true
                        }
                    }
                }
            })
            res.status(200).json({ message: "Successfully find user answer", answer})
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: "Failed find user answer" });
        }
    },

    createAnswer: async (req, res) => {
        const user_id = req.user
        const userAnswer = req.body.userAnswer
        try {
            console.log(userAnswer)
            const answer = await Promise.all(
                userAnswer.map(async (answer) => {
                    try {
                        // Mendapatkan choice berdasarkan question_id dan choice_answer
                        const choice = await prisma.multipleChoice.findFirst({
                            where: {
                                AND: [
                                    { choice_answer: answer.choice_answer }
                                ]
                            }
                        });
                        if (!choice) {
                            // Jika tidak ada pilihan yang sesuai, kirimkan respon dengan pesan error
                            throw new Error("Choice not found for the given question and choice answer");
                        }
                        // Membuat user answer
                        return await prisma.userAnswer.create({
                            data: {
                                user_id: parseInt(user_id),
                                question_id: answer.question_id,
                                choice_id: choice.choice_id
                            }
                        });
                    } catch (error) {
                        throw new Error(`Error creating user answer for question ${answer.question_id}: ${error.message}`);
                    }
                })
            );
            res.status(200).json({ message: "Successfully create user answer", answer})
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: "Failed create user answer" });
        }
    }
}

module.exports = userAnswerController