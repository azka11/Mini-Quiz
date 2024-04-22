import React, { useState, useEffect } from "react";
import { createQuestion } from "../modules/fetch/question";
import { getAllCategory } from "../modules/fetch/category";

function AddQuestion({ closeModal, allQuestion }) {

    const [error, setError] = useState("");
    const [data, setData] = useState([])
    const [formData, setFormData] = useState({
        category_name: "",
        question_text: "",
        correct_answer: "",
        });
  
        const handleInputChange = (e) => {
          const { name, value } = e.target;
          setFormData((prevData) => ({ ...prevData, [name]: value }));
        };
      
        const handleFormSubmit = async (e) => {
          e.preventDefault();
      
          try {
              if (!formData.category_name || !formData.question_text || !formData.correct_answer) {
                  // Tangani kesalahan validasi, misalnya, tampilkan pesan kepada pengguna
                  alert('Silakan isi semua kolom yang diperlukan');
                  return;
                }
        
                // Gunakan createWarehouse tanpa FormData
                await createQuestion(formData);
            
                // Atur ulang formulir setelah pengiriman berhasil
                setFormData({
                    category_name: "",
                    question_text: "",
                    correct_answer: "",
                });
                
                // Tangani kesuksesan, misalnya, tutup modal
                await closeModal();
                await allQuestion()
              } catch (error) {
                // Tangani kesalahan, tampilkan pesan kesalahan yang ramah pengguna
                console.error('Gagal menambahkan category', error);
                // Anda mungkin juga ingin menampilkan pesan kesalahan kepada pengguna
              }
        };

        const fetchCategory = async () => {
            const result = await getAllCategory()
            setData([...result.category])
        }

        useEffect(() => {
            fetchCategory()
        }, [])

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="w-full max-w-md bg-white shadow-md p-6 rounded-3xl z-1">
          <button
            onClick={() => {
              closeModal()
              setError(""); // Reset pesan kesalahan saat menutup modal
            }}
            className="text-black text-2xl hover:text-white font-bold"
          >
            X
          </button>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Create New Question</h2>
          <form className="flex flex-col" onSubmit={handleFormSubmit}>
            <select
              id="category_name"
              name="category_name"
              className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              placeholder="category name"
              value={formData.category_name}
              onChange={handleInputChange}>
            <option disabled value="" className="text-gray-400">Category</option>
            {data.map((category) => (
                <option key={category.category_id} value={category.category_name}>
                    {category.category_name}
                </option>
            ))}
            </select>
            <textarea
              id="question_text"
              name="question_text"
              className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              placeholder="question text"
              value={formData.question_text}
              onChange={handleInputChange}
            />
            <textarea
              id="correct_answer"
              name="correct_answer"
              className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              placeholder="correct answer"
              value={formData.correct_answer}
              onChange={handleInputChange}
            />
            <button
              type="submit"
              onClick={() => console.log("Add Task clicked")} // Gantilah dengan fungsi atau tindakan yang sesuai
              className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
            >
              ADD
            </button>
          </form>
        </div>
      </div>
    )
}

export default AddQuestion;