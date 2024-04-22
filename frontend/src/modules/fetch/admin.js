import axios from 'axios';
import { instance } from '../axios/index';

// Function for register user endpoint
async function registerAdmin(name, email, password) {
  try {
    const response = await axios.post('http://localhost:3000/admin/register', { name, email, password });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Something went wrong');
  }
}

// Function for login user endpoint
async function loginAdmin(name, password) {
  try {
    const response = await axios.post('http://localhost:3000/admin/login', { name, password });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Something went wrong');
  }
}

async function logoutAdmin() {
  try {
       await instance.post('/admin/logout')
  } catch (error) {
      throw new Error(error.response.data.message || 'something went wrong')
  }
}

async function getSpecificAdmin() {
  try {
    const response = await instance.get(`/admin/specific`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'something went wrong')
  }
}

async function editProfile(admin_id, formData) {
    try {
        const response = await instance.put(`/admin/edit/${admin_id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message || 'Something went wrong');
    }
}
export { registerAdmin, loginAdmin, logoutAdmin, getSpecificAdmin, editProfile };