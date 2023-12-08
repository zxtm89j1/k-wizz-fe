// ... (previous code)

const EditQuestionForm = (props) => {
  // ... (previous code)

  const handleRadioButtonsChange = (e) => {
    const selectedValue = e.target.value;

    // If the same radio button is clicked again, uncheck it
    const newCorrectAnswer =
      questionToSubmit.correct_answer === selectedValue ? "" : selectedValue;

    setQuestionToSubmit((prevQuestionToSubmit) => ({
      ...prevQuestionToSubmit,
      correct_answer: newCorrectAnswer,
    }));
  };

  // ... (previous code)

  return (
    <div className="flex justify-center items-center flex-col h-[100vh] fixed top-0 bottom-0 left-0 right-0 bg-gray-500 bg-opacity-60">
      <form
        className="max-w-md w-full bg-white z-20 p-5 rounded-lg"
        onSubmit={handleSubmitEditedQuestion}
      >
        {/* ... (previous code) */}

        {questionToSubmit.choices ? (
          questionToSubmit.choices.map((choice, index) => (
            <div className="mb-4">
              <input
                type="radio"
                name="correct_answer"
                className="appearance-none border-2 border-pink-500/50 rounded-full w-6 h-6 checked:bg-pink-500 checked:border-transparent focus:outline-none"
                required
                checked={
                  Number(choice.value_in_frontend) ===
                  Number(questionToSubmit.correct_answer)
                }
                onChange={handleRadioButtonsChange}
                value={choice.value_in_frontend}
              />
              <input
                className="w-full border-2 border-pink-500/50 rounded-md px-4 py-2 focus:border-pink-700 focus:outline-none focus:ring-0 font-fredoka"
                type="text"
                required
                value={choice.choice_text}
              />
            </div>
          ))
        ) : (
          <div>It doesn't have the array!!!!</div>
        )}

        {/* ... (previous code) */}
      </form>
    </div>
  );
};
