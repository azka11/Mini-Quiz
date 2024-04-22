import { instance } from "../axios";

async function getAllChoice() {
    try {
        const response = await instance.get('/choice')
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function getChoiceByQuestion(question_id) {
    try {
        const response = await instance.get(`choice/${question_id}`)
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function createChoice(formData) {
    try {
        const response = await instance.post(`/choice/create`, formData)
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function updateChoice(choice_id, formData) {
    try {
        const response = await instance.put(`/choice/update/${choice_id}`, formData)
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function deleteChoice(choice_id) {
    try {
        const response = await instance.delete(`/choice/${choice_id}`)
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

export { getAllChoice, getChoiceByQuestion, createChoice, updateChoice, deleteChoice }