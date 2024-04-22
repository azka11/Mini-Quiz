import { instance } from "../axios";

async function getAllCategory() {
    try {
        const response = await instance.get(`/category`)
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function createCategory(formData) {
    try {
        const response = await instance.post(`/category/create`, formData)
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function updateCategory(category_id, formData) {
    try {
        const response = await instance.put(`/category/update/${category_id}`, formData)
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function deleteCategory(category_id) {
    try {
        const response = await instance.delete(`/category/${category_id}`)
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

export { getAllCategory, createCategory, updateCategory, deleteCategory }