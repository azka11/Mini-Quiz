import React, { useState, useEffect } from "react";
import { getChoiceByQuestion } from "../modules/fetch/choice";

function UserMultipleChoice({ question, answers, onAnswerChange, onSubmit }) {
    const [choices, setChoices] = useState([]);

    useEffect(() => {
        fetchDataChoice();  
    },[question.question_id]);

    const fetchDataChoice = async () => {
        try {
            const result = await getChoiceByQuestion(question.question_id);
            setChoices(result.choice);
        } catch (error) {
            console.error("Error fetching choices:", error);
        }
    };

    const handleInputChange = (index, e) => {
        const { value } = e.target;
        onAnswerChange(question.question_id, value);
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault(); // Mencegah perilaku default form

    //     try {
    //         // Memeriksa apakah semua pertanyaan telah dijawab
    //         const allQuestionsAnswered = Object.keys(answers).length === choices.length;
    
    //         if (allQuestionsAnswered) {
    //             await onSubmit(); // Panggil handleSubmit yang diteruskan dari UserQuizForm
    //             navigate('/');
    //             console.log('Answers submitted successfully');
    //         } else {
    //             console.error('All questions must be answered before submitting.');
    //         }
    //     } catch (error) {
    //         console.error('Failed to submit answers:', error);
    //     }
    // };

    // const allQuestionsAnswered = Object.keys(answers).length === choices.length;
    
    return (
        <div>
            {choices.map((choice, index) => (
                <div className="flex items-center mb-4" key={choice.choice_id}>
                    <input 
                        type="radio"
                        name={`choice_answer_${question.question_id}`}
                        value={choice.choice_answer}
                        className="w-4 h-4"
                        onChange={(e) => handleInputChange(index, e)}
                        checked={choice.choice_answer === answers[question.question_id]}
                    />
                    <label
                        // htmlFor={`choice-option-${choice.choice_answer}`}
                        className="block ms-2 text-sm font-medium text-gray-900 dark:text-gray-800"
                    >
                        {choice.choice_answer}
                    </label>
                </div>
            ))}
    </div>
    )
}

export default UserMultipleChoice