import React, { useState, useEffect } from 'react';
import { deleteQuestion, getQuestionByAdmin } from '../modules/fetch/question';
import AdminSideBar from '../components/Admin_SideBar';
import { deleteChoice, getChoiceByQuestion } from '../modules/fetch/choice';
import AddQuestion from '../components/AddQuestion';
import AddChoice from '../components/AddChoice';

function AdminQuizPage() {

    const [modalQuestion, setModalQuestion] = useState(false)
    const [modalChoice, setModalChoice] = useState(false)
    const [question, setQuestion] = useState([])
    const [choice, setChoice] = useState([])

    const openAddQuestion = () => {
      setModalQuestion(true)
    }

    const closeAddQuestion = () => {
      setModalQuestion(false)
    }

    const openAddChoice = () => {
      setModalChoice(true)
    }

    const closeAddChoice = () => {
      setModalChoice(false)
    }

    const toggleAccordion = (idx) => {
        setQuestion(prevQuestion => prevQuestion.map((q, index) => {
            if (index === idx) {
                return { ...q, isOpen: !q.isOpen };
            } else {
                return { ...q, isOpen: false };
            }
        }));
    };

    const fetchChoice = async (questionId) => {
        const result = await getChoiceByQuestion(questionId);
        setChoice(prevChoices => ({
            ...prevChoices,
            [questionId]: result.choice
        }));
    };

    const fetchQuestion = async () => {
      const result = await getQuestionByAdmin();
      const questionsWithOpenState = result.question.map(q => ({ ...q, isOpen: false }));
      setQuestion(questionsWithOpenState);
      for (const q of questionsWithOpenState) {
        await fetchChoice(q.question_id);
        // await deleteQuestionRow(q.question_id);
      }
    };
    
    useEffect(() => {
      fetchQuestion()
    },[])
    
    const deleteQuestionRow = async (questionId) => {
      await deleteQuestion(questionId)
      .then((response) => {
        console.log(response)
        fetchQuestion()
      })
    }

    const deleteChoiceRow = async (choiceId) => {
      await deleteChoice(choiceId)
      .then((response) => {
        console.log(response)
      })
    }

  return (
    <div>
    <div>
        <AdminSideBar />
    </div>   

    <div className="flex flex-col max-h-screen justify-center overflow-hidden py-2 sm:py-12">
  <div className="mx-auto max-w-screen-xl px-4 w-full overflow-x-auto no-scrollbar">
    <div className="flex justify-between">
    <h2 className="font-bold italic text-2xl">Questions</h2>
    <div>
    <button onClick={() => openAddQuestion()} className="bg-blue-700 rounded-full text-white py-2 px-4 m-2 font-semibold drop-shadow-lg">Add Question</button>
    <button onClick={() => openAddChoice()} className="bg-blue-700 rounded-full text-white py-2 px-4 m-2 font-semibold drop-shadow-lg">Add Multiple Choice</button>
    </div>
    </div>
    <div className="grid grid-cols-5 gap-4">
      {question.map((quest, idx) => (
        <div key={quest.question_id} className="col-span-1">
          <div className="bg-white my-2 shadow-2xl">
            <div className="flex justify-between items-center font-semibold p-3 cursor-pointer">
              <h2 className="flex items-center justify-between w-full p-3 cursor-pointer" onClick={() => toggleAccordion(idx)}>
                <span>{quest.question_id}. {quest.question_text}</span>
                <svg className={`fill-current text-purple-700 h-6 w-6 transform transition-transform duration-500 flex-shrink-0 ${quest.isOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20">
                  <path d="M13.962,8.885l-3.736,3.739c-0.086,0.086-0.201,0.13-0.314,0.13S9.686,12.71,9.6,12.624l-3.562-3.56C5.863,8.892,5.863,8.611,6.036,8.438c0.175-0.173,0.454-0.173,0.626,0l3.25,3.247l3.426-3.424c0.173-0.172,0.451-0.172,0.624,0C14.137,8.434,14.137,8.712,13.962,8.885 M18.406,10c0,4.644-3.763,8.406-8.406,8.406S1.594,14.644,1.594,10S5.356,1.594,10,1.594S18.406,5.356,18.406,10 M17.521,10c0-4.148-3.373-7.521-7.521-7.521c-4.148,0-7.521,3.374-7.521,7.521c0,4.147,3.374,7.521,7.521,7.521C14.148,17.521,17.521,14.147,17.521,10"></path>
                </svg>
                </h2>
            </div> 
            <div className="flex justify-between items-center font-semibold p-3">
            <svg
                viewBox="0 0 24 24"
                fill="red"
                className="h-6 w-6 flex-shrink-0 cursor-pointer"
                onClick={() => deleteQuestionRow(quest.question_id)}
              >
              <path d="M12 2c5.53 0 10 4.47 10 10s-4.47 10-10 10S2 17.53 2 12 6.47 2 12 2m5 5h-2.5l-1-1h-3l-1 1H7v2h10V7M9 18h6a1 1 0 001-1v-7H8v7a1 1 0 001 1z" />
              </svg>
            </div>
            <div className="border-l-2 border-purple-600 overflow-hidden duration-500 transition-all" style={{ maxHeight: quest.isOpen ? 'none' : 0 }}>
            <div className="p-4">
              <p className="text-gray-900 italic">Create By: {quest.admin.name}</p>
              <p className="text-gray-900 italic">Category: {quest.category.category_name}</p>
              <p className="pb-3 text-gray-900 italic">Correct Answer: {quest.correct_answer}</p>
              {/* Menggunakan map untuk menampilkan pilihan */}
              {choice[quest.question_id]?.map((choice, index) => (
             <div key={choice.choice_id} className="flex justify-between items-center">
             <p className="text-gray-900">{String.fromCharCode(65 + index)}. {choice.choice_answer}</p>
             <svg
                 viewBox="0 0 24 24"
                 fill="red"
                 className="h-6 w-6 flex-shrink-0 cursor-pointer"
                 onClick={() => deleteChoiceRow(choice.choice_id)}
             >
                 <path d="M12 2c5.53 0 10 4.47 10 10s-4.47 10-10 10S2 17.53 2 12 6.47 2 12 2m5 5h-2.5l-1-1h-3l-1 1H7v2h10V7M9 18h6a1 1 0 001-1v-7H8v7a1 1 0 001 1z" />
             </svg>
            </div>
                ))}
            </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

{modalQuestion && (
  <AddQuestion closeModal={closeAddQuestion} allQuestion={fetchQuestion} />
)}

{modalChoice && (
  <AddChoice closeModal={closeAddChoice} data={question} />
)}
</div>
  );
}

export default AdminQuizPage