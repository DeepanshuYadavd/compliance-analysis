import React, { useState } from "react";

const Dashboard = () => {
  const [currentIndex, setCurrentIndex] = useState(null);
  const [score, setScore] = useState(0);

  const QuestionsList = [
    {
      question: "What is the only sea on Earth that has no coastlines?",
      options: ["Sargasso Sea", "Dead Sea", "Coral Sea", "Caspian Sea"],
      answer: "Sargasso Sea",
    },
    {
      question: "Which of these animals is the only mammal that can't jump?",
      options: ["Sloth", "Elephant", "Hippopotamus", "Rhino"],
      answer: "Elephant",
    },
    {
      question:
        "What is the only letter that does not appear in the Periodic Table?",
      options: ["Q", "X", "Z", "V"],
      answer: "Q",
    },
    {
      question: "What color is an airplane's 'black box' flight recorder?",
      options: ["Black", "Red", "Bright Orange", "Neon Green"],
      answer: "Bright Orange",
    },
    {
      question: "What is the only food that can never go bad or spoil?",
      options: ["Rice", "Honey", "Maple Syrup", "Salt"],
      answer: "Honey",
    },
  ];

  const handleAnswer = (ans) => {
    if (QuestionsList[currentIndex]?.answer === ans) {
      setScore(score + 1);
    }
    setCurrentIndex(currentIndex + 1);
  };

  console.log(score, "score");

  if (currentIndex + 1 > QuestionsList?.length) {
    return (
      <div className="container">
        {score}/ {QuestionsList?.length}
      </div>
    );
  }
  return (
    <div className="container">
      {currentIndex === null ? (
        <div className="quizCard">
          <h1 className="title">QUIZ PRO</h1>
          <button className="startBtn" onClick={() => setCurrentIndex(0)}>
            GET STARTED
          </button>
        </div>
      ) : (
        <div className="quizCard" key={currentIndex}>
          <div className="question">
            {" "}
            <span style={{ color: "#00f2fe", marginRight: "10px" }}>
              Que {currentIndex + 1}.
            </span>
            {QuestionsList[currentIndex].question}
          </div>
          <div className="optionsWrapper">
            {QuestionsList[currentIndex].options.map((opt, index) => (
              <button
                key={index}
                className="optionBtn"
                onClick={() => handleAnswer(opt)}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
