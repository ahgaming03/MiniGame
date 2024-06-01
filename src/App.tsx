import React, { useState, useEffect } from "react";
import { Modal } from "./Modal";

const dataModel = [
  {
    id: "1-xCPzEUZ135Iu3c9J4INY0XtQebAFXNz",
    name: "Model 1",
    answers: [
      { ans: "7JXEWlokCwh", result: false },
      { ans: "2Pxqqc73sLR", result: false },
      { ans: "lYEcRrJDXSq", result: false },
      { ans: "7O6pgHcCHlW", result: true },
      { ans: "5Qe0mQA6p6c", result: false },
    ],
  },
  {
    id: "10tNY2cZ4o1_9pRsq7BAV_gVhTC8HPnjm",
    name: "Model 2",
    answers: [
      { ans: "1epmW4grIzR", result: false },
      { ans: "5n6t6HxCf8g", result: true },
      { ans: "eTccVIRIvKM", result: false },
      { ans: "1u8SP5QwqXx", result: false },
      { ans: "9s1cGEm1tYG", result: false },
    ],
  },
  {
    id: "19dZcvyZN1hbjBV4PPFIS-UyZOlHiRtzc",
    name: "Model 3",
    answers: [
      { ans: "kQW9QHFJRUP", result: false },
      { ans: "6LW2aYKLBTf", result: false },
      { ans: "4lVDyIdtvgG", result: false },
      { ans: "8yfqPCkkWLB", result: false },
      { ans: "dgL3r8i7dRl", result: true },
    ],
  },
  {
    id: "1Yc7hC44CgaT2xRBeMrp83ZHy2yFtegBO",
    name: "Model 4",
    answers: [
      { ans: "ckYJJPcfO12", result: false },
      { ans: "hU1qBsd2MCL", result: true },
      { ans: "ldPOlktYP9U", result: false },
      { ans: "eTtpKSKBBWC", result: false },
      { ans: "cESWJZyV6dr", result: false },
    ],
  },
  {
    id: "1hQMFFWelZAPSXgHxbBL9ax7F253TBSQG",
    name: "Model 5",
    answers: [
      { ans: "hWeTSUh42JN", result: false },
      { ans: "kWAmJeVSzCG", result: false },
      { ans: "3go1lpRP4H4", result: false },
      { ans: "e7v0zgVwQID", result: false },
      { ans: "gCEIAYbxtTe", result: true },
    ],
  },
];

// const

const App = () => {
  const [selectedModel, setSelectedModel] = useState<string>("none");
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [wrongAnswer, setWrongAnswer] = useState(0);
  const [winner, setWinner] = useState(false);
  const [loser, setLoser] = useState(false);
  const [spinWheel, setSpinWheel] = useState(true);

  useEffect(() => {
    if (wrongAnswer === 3) {
      setLoser(true);
    }
    if (correctAnswer === 1) {
      setWinner(true);
    }
  }, [wrongAnswer, correctAnswer]);

  const handleNewGame = () => {
    setSelectedModel("none");
    setCorrectAnswer(0);
    setWrongAnswer(0);
    setWinner(false);
    setLoser(false);
  };

  const handleSelectModel = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedModel(e.target.value);
  };

  const handlePlayWrongSound = () => {
    const audio = new Audio("/sounds/wrong.mp3");
    audio.play();
  };

  const handlePlayCorrectSound = () => {
    const audio = new Audio("/sounds/winner.mp3");
    audio.play();
  };

  const handleSelectAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    dataModel
      .filter((item) => item.id === selectedModel)
      .map((item) =>
        item.answers.map((ans) => {
          if (ans.ans === e.currentTarget.value) {
            if (ans.result) {
              setCorrectAnswer(correctAnswer + 1);
              handlePlayCorrectSound();
            } else {
              setWrongAnswer(wrongAnswer + 1);
              handlePlayWrongSound();
              e.currentTarget.disabled = true;
              e.currentTarget.classList.remove("bg-lime-400");
              e.currentTarget.classList.add("bg-red-500");
            }
          }
        }),
      );
  };

  return (
    <>
      <Modal open={spinWheel} onClose={() => setLoser(spinWheel)}>
        <iframe
          src="https://wheelofnames.com/en8-9yx"
          width="800"
          height="600"
        ></iframe>
        <button
          onClick={() => setSpinWheel(false)}
          className="mt-3 inline-flex items-center rounded-lg bg-green-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800"
        >
          Start
        </button>
      </Modal>
      <div className="fixed right-2 top-1 rounded-lg bg-red-500 text-white">
        {selectedModel !== "none" ? (
          <div className="p-3 font-bold">
            Wrong answer: <span>{wrongAnswer}</span>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="mx-12 my-10">
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-2xl border bg-[#004AAD] p-4 pb-8">
            <div className="mb-2 text-2xl font-bold text-gray-200">Model</div>
            <select name="Model" className="mb-2" onChange={handleSelectModel}>
              <option value="none" selected>
                --- Select a model ---
              </option>
              {dataModel.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            <div className="flex justify-center">
              {selectedModel !== "none" ? (
                <div className="sticky top-0">
                  <img
                    className="w-full bg-white"
                    src={`https://drive.google.com/thumbnail?id=${selectedModel}&sz=w10000`}
                    alt="Model"
                  />
                </div>
              ) : (
                <img
                  className="w-full bg-white"
                  src={`https://drive.google.com/thumbnail?id=1dXbE5PZ6Jplgks16vMMKKL2H8yJHo0Jk&sz=w10000`}
                  alt="Model"
                />
              )}
            </div>
          </div>
          <div className="flex h-full flex-col gap-2 rounded-2xl border bg-[#004AAD] p-4 pb-8">
            <div className="text-2xl font-bold text-gray-200">Answer</div>
            {selectedModel !== "none" ? (
              <div className="text-white">Chose an answer:</div>
            ) : (
              <img
                className="mt-8 w-full bg-white"
                src={`https://drive.google.com/thumbnail?id=1dXbE5PZ6Jplgks16vMMKKL2H8yJHo0Jk&sz=w10000`}
                alt="Model"
              />
            )}
            {dataModel
              .filter((item) => item.id === selectedModel)
              .map((item) =>
                item.answers.map((ans, index) => (
                  <div>
                    <button
                      className="mb-2 me-2 w-28 rounded-lg bg-lime-400 bg-gradient-to-r px-5 py-2.5 text-center text-sm font-medium text-gray-900 shadow-lg shadow-lime-500/50 hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-lime-300 dark:shadow-lg dark:shadow-lime-800/80 dark:focus:ring-lime-800"
                      key={ans.ans}
                      value={ans.ans}
                      onClick={handleSelectAnswer}
                    >
                      Answer {index + 1}
                    </button>
                    <iframe
                      width="100%"
                      height="450"
                      src={`https://www.tinkercad.com/embed/${ans.ans}`}
                    ></iframe>
                  </div>
                )),
              )}
          </div>
        </div>
      </div>
      <Modal open={winner} onClose={() => setWinner(false)}>
        <div className="p-4 text-center md:p-5">
          <svg
            className="mx-auto mb-4 h-40 w-40"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 512"
          >
            <path
              fill="#FFD43B"
              d="M528 448H112c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h416c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm64-320c-26.5 0-48 21.5-48 48 0 7.1 1.6 13.7 4.4 19.8L476 239.2c-15.4 9.2-35.3 4-44.2-11.6L350.3 85C361 76.2 368 63 368 48c0-26.5-21.5-48-48-48s-48 21.5-48 48c0 15 7 28.2 17.7 37l-81.5 142.6c-8.9 15.6-28.9 20.8-44.2 11.6l-72.3-43.4c2.7-6 4.4-12.7 4.4-19.8 0-26.5-21.5-48-48-48S0 149.5 0 176s21.5 48 48 48c2.6 0 5.2-.4 7.7-.8L128 416h384l72.3-192.8c2.5 .4 5.1 .8 7.7 .8 26.5 0 48-21.5 48-48s-21.5-48-48-48z"
            />
          </svg>
          <h3 className="mb-5 text-3xl font-bold text-gray-700 dark:text-gray-600">
            YOU WIN
          </h3>
          <button
            onClick={handleNewGame}
            className="inline-flex items-center rounded-lg bg-green-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800"
          >
            New game
          </button>
        </div>
      </Modal>
      <Modal open={loser} onClose={() => setLoser(false)}>
        <div className="p-4 text-center md:p-5">
          <svg
            className="h-30 w-30 mx-auto mb-4 text-red-600 dark:text-red-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <h3 className="mb-5 text-3xl font-bold text-gray-700 dark:text-gray-600">
            YOU LOSE
          </h3>
          <button
            onClick={handleNewGame}
            className="inline-flex items-center rounded-lg bg-green-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800"
          >
            New game
          </button>
        </div>
      </Modal>
    </>
  );
};

export default App;
