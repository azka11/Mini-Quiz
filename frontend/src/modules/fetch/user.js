import axios from 'axios';
import { instance } from '../axios/index';

// Function for register user endpoint
async function registerUser(username, email, password) {
  try {
    const response = await axios.post('http://localhost:3000/user/register', { username, email, password });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Something went wrong');
  }
}

// Function for login user endpoint
async function loginUser(username, password) {
  try {
    const response = await axios.post('http://localhost:3000/user/login', { username, password });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Something went wrong');
  }
}

async function logoutUser() {
  try {
       await instance.post('/user/logout')
  } catch (error) {
      throw new Error(error.response.data.message || 'something went wrong')
  }
}

async function getSpecificUser() {
  try {
    const response = await instance.get(`/user/specific`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'something went wrong')
  }
}

async function editProfile(user_id, formData) {
    try {
        const response = await instance.put(`/user/edit/${user_id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message || 'Something went wrong');
    }
}
export { registerUser, loginUser, logoutUser, getSpecificUser, editProfile };