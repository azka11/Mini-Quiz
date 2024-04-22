import React, { useEffect, useState } from "react"
import smiley from "../assets/smiley.png"
import { useLocation } from "react-router-dom";
import { getAllQuestion, getQuestionByCategory } from "../modules/fetch/question"
import { createAnswer, getAnswer } from "../modules/fetch/userAnswer";
import { useNavigate } from 'react-router-dom';
import UserMultipleChoice from "./User_MultipleChoice";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserSideBar from "./User_SideBar";

function UserQuizForm() {

    const location = useLocation();
    const { fromHome } = location.state;
    let category = fromHome.category;

    if (!fromHome) {
        return <div>Quiz not found</div>;
      }
    
    const [data, setData] = useState([])
    const [currentPage, setCurrentPage] = useState(1) // Nomor halaman yang dipilih
    const [answers, setAnswers] = useState({});
    const [scoreResult, setScoreResult] = useState("")

    const navigate = useNavigate();

    const fetchData = () => {
        getQuestionByCategory(category.category_id) // Mengambil data berdasarkan nomor halaman
        .then((result) => {
            setData([...result.question])
        })
    }

    useEffect(() => {
        fetchData()
    }, [category.category_id]) // Memicu pengambilan data setiap kali nomor halaman berubah

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        // setAnswers(question_id, choice_id)
    }

    // Menangani perubahan jawaban
const handleAnswerChange = (question_id, choice_answer) => {
    const questionId = parseInt(question_id)
    setAnswers(prevAnswers => ({
        ...prevAnswers,
        [questionId]: choice_answer
    }));
}

const calculateScore = () => {
    let score = 0;
    // Iterate through data (pertanyaan)
    data.forEach(question => {
        // Dapatkan jawaban yang benar untuk pertanyaan ini
        const correctAnswer = question.correct_answer;
        // Dapatkan jawaban pengguna untuk pertanyaan ini dari state answers
        const userAnswer = answers[question.question_id];
        // Bandingkan jawaban pengguna dengan jawaban yang benar
        if (userAnswer === correctAnswer) {
            // Tambahkan skor jika jawaban pengguna benar
            score += 10;
        }
    });
    // Kembalikan skor
    return score;
};

const handleSubmit = async () => {
    try {
        // Collect all answers
        const userAnswer = Object.entries(answers).map(([question_id, choice_answer]) => ({
            question_id: parseInt(question_id),
            choice_answer: choice_answer
        }));
        // Send all answers to backend
        await createAnswer(userAnswer);

        setScoreResult('Score Result!')
        const score = calculateScore();
            
        // Tampilkan skor dalam pop-up
        toast.info(`Your score : ${score}`, {
            position: 'top-center',
            onClose: () => {
                navigate('/');
                console.log('Toast closed, navigating to homepage...');
            },
            style: {
                backgroundColor: 'yellow',
                color: "blue"
            }
        });
        console.log('Answers submitted successfully');
    } catch (error) {
        console.error('Failed to submit answers:', error);
    }
};
// const allQuestionsAnswered = Object.keys(answers).length === data.length;

    return (
        <div>
            <div>
                <UserSideBar />
            </div>

            <ToastContainer />
            {data.map((question, index) => (
                <div key={question.question_id}>
                    {index === currentPage - 1 && (
                        <div className="grid grid-cols-4 grid-rows-4 gap-2 bg-[#ebebeb]">
                            <div className="row-span-4 p-14 mt-14 shadow-2xl h-[80vh]">
                                <p className="ml-2 text-gray-700">Soal {category.category_name} :</p>
                                {[...Array(10).keys()].map(pageNumber => (
                                    <button
                                        key={pageNumber}
                                        className="rounded-lg shadow-2xl border-2 border-gray-400 w-10 h-10 m-1 mt-4"
                                        onClick={() => handlePageChange(pageNumber + 1)}
                                    >
                                        {pageNumber + 1}
                                    </button>
                                ))}
                                <button type="button" onClick={handleSubmit} className="bg-blue-500 mt-4 py-2 w-[90%] rounded-3xl text-white">Submit</button>
                            </div>
                            <div className="col-span-3 row-span-4 mt-14 shadow-2xl w-full h-[80vh]">
                                <div className="pl-20 pt-12">
                                    <p className="mb-4 text-lg font-bold">{question.question_text}</p>
                                    <UserMultipleChoice
                                        question={question}
                                        answers={answers}
                                        onAnswerChange={handleAnswerChange}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ))}

            {scoreResult === 'Score Result!' && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className=" bg-white p-8 rounded-lg z-10">
              <p className="text-black text-center text-4xl font-bold mt-4">Your Score : <span className="text-blue-600">{calculateScore()}</span></p>
              <img src={smiley} alt="" className="h-28 w-28 mt-8 ml-[120px]" />
              <p className="text-black text-center text-xl font-bold mt-6">You did a Great Job, Thank You!</p>
              <button
                onClick={() => {
                setScoreResult("")
              }}
                className="bg-blue-700 text-white px-40 py-2 rounded hover:bg-blue-700 mt-10"
              >
                Close
              </button>
            </div>
          </div>
            )} 
        </div>
    )
}

export default UserQuizForm