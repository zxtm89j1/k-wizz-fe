// Question.jsx
const Choices = (props) => {
  let alphabet = ["a", "b", "c", "d"];

  return (
    <div className="w-full grow bg-pink-400">
      <div className="font-bold text-xs lg:text-lg mb-2 mt-3">Choices:</div>
      {props.choices ? (
        props.choices.map((choice, index) => (
          <div className="text-xs sm:text-lg ml-4 font-fredoka font-normal mb-5">
            {alphabet[index] + ". " + choice.choice_text}
          </div>
        ))
      ) : (
        <></>
      )}
    </div>
  );
};

export default Choices;
