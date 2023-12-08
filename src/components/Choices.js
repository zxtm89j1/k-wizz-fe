// Question.jsx
const Choices = (props) => {
  let alphabet = ["a", "b", "c", "d"];

  return (
    <div className="w-64 max-w-[20rem]">
      <div className="font-bold mb-2 mt-3">Choices:</div>
      {props.choices ? (
        props.choices.map((choice, index) => (
          <div className="ml-4">
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
