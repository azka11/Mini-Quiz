import { instance } from "../axios";

async function getAnswer() {
    try {
        const response = await instance.get('/user-answer')
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function createAnswer(userAnswer) {
    try {
        const response = await instance.post(`/user-answer/create`, {userAnswer})
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

export { getAnswer, createAnswer }