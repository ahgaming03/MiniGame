import React, { useState, useEffect } from "react";
import { Modal } from "./Modal";
import { SpinWheel } from "./SpinWheel";
const dataModel = [
  {
    id: "1-xCPzEUZ135Iu3c9J4INY0XtQebAFXNz",
    name: "Model 1",
    desc: "<p>This is a design used for blinking LED lights.</p><strong>Find the code that makes the model work like a blinking LED light.</strong>",
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
    desc: "<p>This is a design used for a traffic light system.</p><strong>Find the code that makes the model work like a traffic light system.</strong>",
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
    desc: "<p>This is a design used for press a button to turn on the LED light and turn off the LED light when the button is released.<p/><strong>Find the code that makes the model work like a press a button to turn on the LED light and turn off the LED light when the button is released.</strong>",
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
    desc: "<p>This is a model used for turning on the LED light at night.</p><strong>Find the code that makes the model work like turning on the LED light at night.</strong>",
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
    desc: "<p>This is a model used for turning on the LED light when motion is detected.</p><strong>Find the code that makes the model work like turning on the LED light when motion is detected.</strong>",
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
  const [disabledButton, setDisabledButton] = useState(false);
  const [model, setModel] = useState<string>("");
  useEffect(() => {
    if (wrongAnswer === 3) {
      setLoser(true);
      setDisabledButton(true);
    }
    if (correctAnswer === 1) {
      setWinner(true);
      setDisabledButton(true);
    }
  }, [wrongAnswer, correctAnswer]);

  const handleNewGame = () => {
    setSelectedModel("none");
    setCorrectAnswer(0);
    setWrongAnswer(0);
    setWinner(false);
    setLoser(false);
    setSpinWheel(true);
    setDisabledButton(false);
    setModel("");
  };

  const handleSelectModel = () => {
    dataModel
      .filter((item) => item.name === model)
      .map((item) => {
        setSelectedModel(item.id);
      });
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
              e.currentTarget.classList.remove("hover:bg-lime-300");
              e.currentTarget.classList.add("bg-red-500");
            }
          }
        }),
      );
  };
  const segments = dataModel.map((item) => item.name);

  const wheelColors = (): string[] => {
    let arr: string[] = [];
    let colors = ["#EE4040", "#F0CF50", "#815CD1", "#3DA5E0", "#34A24F"];
    segments.forEach(() => {
      let color = colors.shift() as string;
      arr.push(color);
      colors.push(color);
    });
    return arr;
  };

  const segColors = wheelColors();

  return (
    <>
      <button
        onClick={handleNewGame}
        className="ml-3 mt-3 w-28 rounded-lg bg-lime-400 bg-gradient-to-r px-5 py-2.5 text-center text-sm font-medium shadow-lg shadow-lime-500/50 hover:bg-lime-300 hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-lime-300 dark:shadow-lg dark:shadow-lime-800/80 dark:focus:ring-lime-800"
      >
        Restart
      </button>
      <Modal open={spinWheel} onClose={() => setSpinWheel(false)}>
        <div className="text-center">
          <SpinWheel
            segments={segments}
            segColors={segColors}
            winningSegment={"5"}
            onFinished={(spin) => setModel(spin)}
            primaryColor="gray"
            contrastColor="white"
            buttonText="Spin"
            isOnlyOnce={false}
          />
          <div className="text-3xl font-bold">{model}</div>

          <button
            onClick={() => {
              setSpinWheel(false);
              handleSelectModel();
            }}
            className={`${model === "" ? "invisible" : ""} mt-3 inline-flex items-center rounded-lg bg-green-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800`}
          >
            Start
          </button>
        </div>
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
          <div className="flex flex-col gap-2 rounded-2xl border bg-[#004AAD] p-4 pb-8">
            <div className="text-2xl font-bold text-gray-200">Model</div>
            <div className="flex justify-center">
              {selectedModel !== "none" ? (
                <div className="flex flex-col gap-4">
                  <img
                    className="w-full bg-white"
                    src={`https://drive.google.com/thumbnail?id=${selectedModel}&sz=w10000`}
                    alt="Model"
                  />
                  <div className="text-2xl font-bold text-white">
                    Description
                  </div>
                  {dataModel.map((item) =>
                    item.id === selectedModel ? (
                      <div
                        key={item.id}
                        className="rounded-md bg-white p-3 text-2xl"
                      >
                        <div dangerouslySetInnerHTML={{ __html: item.desc }} />
                      </div>
                    ) : (
                      ""
                    ),
                  )}
                </div>
              ) : (
                <img
                  className="w-full bg-white"
                  // src={`https://drive.google.com/thumbnail?id=1dXbE5PZ6Jplgks16vMMKKL2H8yJHo0Jk&sz=w10000`}
                  src="/images/default.png"
                  alt="Model"
                />
              )}
            </div>
            <div className="text-2xl font-bold text-white">HOW TO PLAY</div>
            <div className="rounded-md bg-white p-3 text-2xl">
              <ul className="ml-8 list-decimal">
                <li>
                  Before start the game click{" "}
                  <button className="inline-block rounded-sm border-2 border-gray-300 pr-1 text-base">
                    <div className="flex items-center justify-center">
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 30 30"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g fill-rule="evenodd">
                          <path
                            d="M24.268,7 L5.732,7 C4.775,7 4,7.776 4,8.732 L4,21.952 C4,22.531 4.469,23 5.048,23 L24.953,23 C25.531,23 26,22.531 26,21.952 L26,8.732 C26,7.776 25.224,7 24.268,7 L24.268,7 Z M12,8.99 C12,8.443 12.443,8 12.99,8 L13.01,8 C13.557,8 14,8.443 14,8.99 L14,9.01 C14,9.557 13.557,10 13.01,10 L12.99,10 C12.443,10 12,9.557 12,9.01 L12,8.99 L12,8.99 Z M9,8.99 C9,8.443 9.443,8 9.99,8 L10.01,8 C10.557,8 11,8.443 11,8.99 L11,9.01 C11,9.557 10.557,10 10.01,10 L9.99,10 C9.443,10 9,9.557 9,9.01 L9,8.99 L9,8.99 Z M6,8.99 C6,8.443 6.443,8 6.99,8 L7.01,8 C7.557,8 8,8.443 8,8.99 L8,9.01 C8,9.557 7.557,10 7.01,10 L6.99,10 C6.443,10 6,9.557 6,9.01 L6,8.99 L6,8.99 Z M25,11 L25,22 L5,22 L5,11 L25,11 L25,11 Z"
                            transform=""
                          ></path>
                          <path d="M13,20.7 C12.805,20.7 12.609,20.637 12.444,20.507 L8.364,17.297 C8.147,17.127 8.021,16.866 8.021,16.59 C8.021,16.314 8.147,16.054 8.364,15.883 L12.444,12.672 C12.834,12.364 13.4,12.431 13.708,12.822 C14.016,13.213 13.948,13.779 13.558,14.086 L10.377,16.59 L13.558,19.093 C13.949,19.4 14.016,19.966 13.709,20.357 C13.53,20.582 13.266,20.7 13,20.7 L13,20.7 Z"></path>
                          <path d="M17,20.9 C16.882,20.9 16.762,20.877 16.646,20.827 C16.189,20.632 15.978,20.102 16.173,19.645 L19.173,12.645 C19.368,12.188 19.897,11.975 20.355,12.172 C20.812,12.368 21.023,12.897 20.828,13.354 L17.828,20.354 C17.681,20.695 17.349,20.9 17,20.9 L17,20.9 Z"></path>
                        </g>
                      </svg>
                      Code
                    </div>
                  </button>{" "}
                  to see the code block.
                </li>
                <li>
                  Read the description and chose the correct answer by clicking{" "}
                  <button className="mb-2 me-2 w-28 rounded-lg bg-lime-400 bg-gradient-to-r px-5 py-2.5 text-center text-sm font-medium shadow-lg shadow-lime-500/50 hover:bg-lime-300 hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-lime-300 dark:shadow-lg dark:shadow-lime-800/80 dark:focus:ring-lime-800">
                    Answer
                  </button>
                </li>
                <li>
                  If you choose the correct answer, you will win the game
                  <br />
                  If you choose the incorrect answer, don't worry, you have 2
                  more chances
                </li>
              </ul>
              <p className="mt-5 italic text-red-400">
                *** Don't press{" "}
                <button className="inline-block rounded-sm border-2">
                  <div className="flex items-center justify-center pr-2 text-base text-black">
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 30 30"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10,21.0619852 L10,9.00198521 C10,8.19498521 10.906,7.71998521 11.569,8.17998521 L20.569,13.8129852 C21.126,14.1989852 21.147,15.0149852 20.61,15.4279852 L11.61,21.8549852 C10.952,22.3609852 10,21.8919852 10,21.0619852"
                        transform="translate(0 0)"
                        fill-rule="evenodd"
                      ></path>
                    </svg>
                    Start Simulation
                  </div>
                </button>{" "}
                before chose the answer.***
              </p>
            </div>
          </div>
          <div className="flex h-full flex-col gap-2 rounded-2xl border bg-[#004AAD] p-4 pb-8">
            <div className="text-2xl font-bold text-gray-200">Answer</div>
            {selectedModel !== "none" ? (
              <div className="text-white">Chose an answer:</div>
            ) : (
              <img
                className="w-full bg-white"
                // src={`https://drive.google.com/thumbnail?id=1dXbE5PZ6Jplgks16vMMKKL2H8yJHo0Jk&sz=w10000`}
                src="/images/default.png"
                alt="Model"
              />
            )}
            {dataModel
              .filter((item) => item.id === selectedModel)
              .map((item) =>
                item.answers.map((ans, index) => (
                  <div>
                    <button
                      className={`${
                        wrongAnswer === 3 || correctAnswer === 1 ? "" : ""
                      } mb-2 me-2 w-28 rounded-lg bg-lime-400 bg-gradient-to-r px-5 py-2.5 text-center text-sm font-medium shadow-lg shadow-lime-500/50 hover:bg-lime-300 hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-lime-300 dark:shadow-lg dark:shadow-lime-800/80 dark:focus:ring-lime-800`}
                      key={ans.ans}
                      value={ans.ans}
                      onClick={handleSelectAnswer}
                      disabled={disabledButton}
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
          <button
            onClick={() => setWinner(false)}
            className="ms-3 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
          >
            Cancel
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
          <button
            onClick={() => setLoser(false)}
            className="ms-3 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
          >
            Cancel
          </button>
        </div>
      </Modal>
    </>
  );
};

export default App;
