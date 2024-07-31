import { useState, useEffect } from "react";
import { Modal } from "./Modal";
import { Wheel } from "react-custom-roulette";
import { modelQuestions, wheelData } from "./drafts/data";
import { IAnswer, IItem } from "./types";
import { DragAndDrop } from "./components/DnD/DragAndDrop";

const App = () => {
  const [selectedModel, setSelectedModel] = useState<number | null>(null);

  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);

  const [winner, setWinner] = useState(false);
  const [loser, setLoser] = useState(false);
  const [gameRules, setGameRules] = useState(false);

  const [spinWheel, setSpinWheel] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  const [isStart, setIsStart] = useState<boolean>(false);

  useEffect(() => {
    console.log("select", selectedModel);
    if (wrong === 3) {
      setLoser(true);
      setDisabled(true);
    }
    if (correct === 1) {
      setWinner(true);
      setDisabled(true);
    }
  }, [wrong, correct]);

  const handleNewGame = () => {
    setSelectedModel(null);
    setIsStart(false);

    setCorrect(0);
    setWrong(0);

    setWinner(false);
    setLoser(false);

    setSpinWheel(true);
    setDisabled(false);
  };

  const checkAnswer = (clientAnswer: IItem[], correctAnswer: IAnswer[]) => {
    var isCorrect = true;
    clientAnswer.length !== correctAnswer.length
      ? (isCorrect = false)
      : correctAnswer.map((item, index) => {
          if (
            item.type !== clientAnswer[index].type &&
            item.content !== clientAnswer[index].content
          ) {
            isCorrect = false;
          }
        });
    if (isCorrect) {
      setCorrect(correct + 1);
      handlePlayCorrectSound();
    } else {
      setWrong(wrong + 1);
      handlePlayWrongSound();
    }
  };
  // Handle when the user drops an 'Droppable' component

  const handleSpinClick = () => {
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * wheelData.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
      setIsStart(false);
    }
  };

  const handlePlayWrongSound = () => {
    const audio = new Audio("/sounds/wrong.mp3");
    audio.play();
  };

  const handlePlayCorrectSound = () => {
    const audio = new Audio("/sounds/winner.mp3");
    audio.play();
  };

  return (
    <>
      <h1 className="my-6 text-center text-5xl font-bold text-white shadow-gray-500/50 sm:text-7xl">
        DRAG and DROP
      </h1>
      <div className="flex items-center justify-between gap-2">
        <button
          onClick={handleNewGame}
          className="m-3 rounded-lg bg-lime-400 bg-gradient-to-r px-5 py-2.5 text-center text-sm font-medium shadow-lg shadow-lime-500/50 hover:bg-lime-300 hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-lime-300"
        >
          New game
        </button>
        <button
          onClick={() => setGameRules(true)}
          className="m-3 rounded-lg bg-blue-400 bg-gradient-to-r px-5 py-2.5 text-center text-sm font-medium shadow-lg shadow-blue-500/50 hover:bg-blue-300 hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          How to play
        </button>
      </div>

      <div className="fixed right-2 top-1 rounded-lg bg-red-500 text-white">
        {selectedModel ? (
          <div className="p-3 font-bold">
            Wrong answer: <span>{wrong}</span>
          </div>
        ) : null}
      </div>
      <div className="mx-12 my-10">
        <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
          <div className="flex flex-col gap-2 rounded-2xl border bg-[#004AAD] p-4 pb-8">
            <div className="text-2xl font-bold text-gray-200">Model</div>
            <div className="flex justify-center">
              {selectedModel ? (
                <div className="flex flex-col gap-4">
                  {modelQuestions
                    .filter((item) => item.id === `m${selectedModel}`)
                    .map((item) => (
                      <div key={item.id}>
                        <img
                          className="w-full bg-white"
                          src={item.imagePath}
                          alt="Model"
                        />
                        <div className="text-2xl font-bold text-white">
                          Problem
                        </div>
                        <div className="rounded-md bg-white p-3 text-2xl">
                          {item.description}
                          <div className="mt-4 text-xl italic">
                            *** Rearrange the boxes to solve the problem above.
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <img
                  className="w-full bg-white"
                  src="/images/default.png"
                  alt="Model"
                />
              )}
            </div>
          </div>
          <div className="flex h-full flex-col gap-2 rounded-2xl border bg-[#004AAD] p-4 pb-8">
            <div className="text-2xl font-bold text-gray-200">Your answer:</div>

            {selectedModel ? (
              <>
                <div className="text-2xl font-bold text-white">
                  Model {selectedModel}
                </div>
                <div
                  className={`flex min-h-32 flex-col items-center justify-center ${disabled ? "pointer-events-none" : ""}`}
                >
                  <DragAndDrop
                    initialData={
                      modelQuestions[selectedModel ? selectedModel - 1 : 0]
                    }
                    checkAnswer={checkAnswer}
                  />
                </div>
              </>
            ) : (
              <img
                className="w-full bg-white"
                src="/images/default.png"
                alt="Model"
              />
            )}
          </div>
        </div>
      </div>
      <Modal open={spinWheel} onClose={() => setSpinWheel(false)}>
        <div className="text-center">
          <Wheel
            mustStartSpinning={mustSpin}
            prizeNumber={prizeNumber}
            data={wheelData}
            backgroundColors={["#3e3e3e", "#df3428"]}
            fontSize={20}
            outerBorderColor={"#3e3e3e"}
            innerBorderColor={"#3e3e3e"}
            onStopSpinning={() => {
              setMustSpin(false);
              setIsStart(true);
            }}
          />
          {!isStart ? null : (
            <>
              <div className="text-3xl font-bold">
                {
                  wheelData[prizeNumber > 4 ? prizeNumber - 5 : prizeNumber]
                    .option
                }
              </div>
              <button
                onClick={() => {
                  setSpinWheel(false);
                  setSelectedModel(
                    prizeNumber > 4 ? prizeNumber - 4 : prizeNumber + 1,
                  );
                }}
                className="mr-3 mt-3 inline-flex items-center rounded-lg bg-green-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300"
              >
                Start
              </button>
            </>
          )}
          <button
            onClick={handleSpinClick}
            className="mt-3 inline-flex items-center rounded-lg bg-yellow-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-yellow-800 focus:outline-none focus:ring-4 focus:ring-yellow-300"
          >
            SPIN
          </button>
        </div>
      </Modal>
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
          <h3 className="mb-5 text-3xl font-bold text-gray-700">YOU WIN</h3>
          <button
            onClick={handleNewGame}
            className="inline-flex items-center rounded-lg bg-green-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300"
          >
            New game
          </button>
          <button
            onClick={() => setWinner(false)}
            className="ms-3 rounded-lg border border-red-200 bg-red-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-800 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100"
          >
            Cancel
          </button>
        </div>
      </Modal>
      <Modal open={loser} onClose={() => setLoser(false)}>
        <div className="p-4 text-center md:p-5">
          <svg
            className="h-30 w-30 mx-auto mb-4 text-red-600"
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
          <h3 className="mb-5 text-3xl font-bold text-gray-700">YOU LOSE</h3>
          <button
            onClick={handleNewGame}
            className="inline-flex items-center rounded-lg bg-green-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300"
          >
            New game
          </button>
          <button
            onClick={() => setLoser(false)}
            className="ms-3 rounded-lg border border-gray-400 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-200 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100"
          >
            Cancel
          </button>
        </div>
      </Modal>
      <Modal open={gameRules} onClose={() => setGameRules(false)}>
        <div className="rounded-xl bg-[#004AAD] p-4">
          <div className="mb-2 text-center text-3xl font-bold text-white">
            HOW TO PLAY
          </div>
          <div className="rounded-md bg-white p-3">
            <ol className="ml-8 list-decimal">
              <p className="text-2xl font-bold">Rules:</p>
              <li>You have to solve the problem by rearranging the boxes.</li>
              <li>You have to select the correct answer to the problem.</li>
              <li>You have to submit your answer to check if it is correct.</li>
              <li>You have to win the game by giving the correct answer.</li>
              <p className="text-2xl font-bold">Instructions:</p>
              <p>
                1. Spin the wheel to get a model and a problem to solve.
                <br />
                2. Rearrange the boxes to solve the problem.
                <br />
                3. Select the answer that you think is correct.
                <br />
                4. Click the submit button to check your answer.
                <br />
                5. If your answer is correct, you win. Otherwise, you lose after
                3 wrong answers.
              </p>
            </ol>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default App;
