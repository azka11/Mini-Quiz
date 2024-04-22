import React, { useState, useEffect } from "react";
import { createChoice } from "../modules/fetch/choice";

function AddChoice({ data, closeModal, allChoice }) {

    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
            question_text: "",
            choice_answer: ""
        });

        // const questionId = data.map(question => question.question_id);
        // console.log(questionId)
  
        const handleInputChange = (e) => {
          const { name, value } = e.target;
          setFormData((prevData) => ({ ...prevData, [name]: value }));
        };
      
        const handleFormSubmit = async (e) => {
          e.preventDefault();
      
          try {
              if (!formData.question_text || !formData.choice_answer) {
                  // Tangani kesalahan validasi, misalnya, tampilkan pesan kepada pengguna
                  alert('Silakan isi semua kolom yang diperlukan');
                  return;
                }
        
                // Gunakan createWarehouse tanpa FormData
                await createChoice(formData);
            
                // Atur ulang formulir setelah pengiriman berhasil
                setFormData({
                    question_text: "",
                    choice_answer: "",
                });
                
                // Tangani kesuksesan, misalnya, tutup modal
                await closeModal();
                
                window.location.reload()
               
              } catch (error) {
                // Tangani kesalahan, tampilkan pesan kesalahan yang ramah pengguna
                console.error('Gagal menambahkan category', error);
                // Anda mungkin juga ingin menampilkan pesan kesalahan kepada pengguna
              }
        };

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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Create New Choice</h2>
          <form className="flex flex-col" onSubmit={handleFormSubmit}>
            <select
              id="question_text"
              name="question_text"
              className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              placeholder="question text"
              value={formData.question_text}
              onChange={handleInputChange}>
            <option disabled value="" className="text-gray-400">Question</option>
            {data.map((question) => (
                <option key={question.question_id} value={question.question_text} className="overflow-x-auto no-scrollbar h-54 w-24">
                    {question.question_text}
                </option>
            ))}
            </select>
            <textarea
              id="choice_answer"
              name="choice_answer"
              className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              placeholder="choice answer"
              value={formData.choice_answer}
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

export default AddChoice;