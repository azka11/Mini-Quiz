import { instance } from '../axios/index';

async function getAllQuestion() {
    try {
        const response = await instance.get('/question');
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function getQuestionById(question_id) {
    try {
        const response = await instance.get(`/question/${question_id}`)
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function getQuestionByCategory(category_id) {
    try {
        const response = await instance.get(`/question/category/${category_id}`)
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function getQuestionByAdmin() {
    try {
        const response = await instance.get('/question/admin');
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function createQuestion(formData) {
    try {
        const response = await instance.post(`/question/create`, formData)
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function updateQuestion(question_id, formData) {
    try {
        const response = await instance.put(`/question/update/${question_id}`, formData)
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function deleteQuestion(question_id) {
    try {
        const response = await instance.delete(`question/${question_id}`)
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

export { getAllQuestion, getQuestionById, getQuestionByCategory, getQuestionByAdmin, createQuestion, updateQuestion, deleteQuestion }