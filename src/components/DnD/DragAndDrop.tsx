import React from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import DroppableContainerSelect from "./DroppableContainerSelect";
import { IAnswer, IItem, IQuest } from "../../types";
import DroppableContainerAnswer from "./DroppableContainerAnswer";
import { appendAt, remove, reorder } from "../../utils";

interface IBoxDnD {
  initialData: IQuest;
  checkAnswer: (clientAnswer: IItem[], correctAnswer: IAnswer[]) => void;
}

export const DragAndDrop: React.FC<IBoxDnD> = ({
  initialData,
  checkAnswer,
}) => {
  const [box, setBox] = React.useState(initialData.question);

  // Handle when the user drops an 'Droppable' component
  function handleDragEnd(result: DropResult) {
    const src = result.source;
    const dest = result.destination;

    // Dropped outside the list
    if (!dest) {
      return;
    }

    if (src.droppableId === dest.droppableId) {
      // --- SAME CONTAINER ---
      // If same container, just reorder
      const items = reorder([...box[src.droppableId]], src.index, dest.index);

      // Set the correct box category
      const tempBox = { ...box };
      tempBox[src.droppableId] = items;

      setBox({ ...tempBox });
    } else {
      // --- DIFFERENT CONTAINER ---
      // Otherwise, we need to handle source and destination

      // Remove from the source list
      const srcItems = remove(box[src.droppableId], src.index);

      // Add to the new list
      const destItems = appendAt(
        box[dest.droppableId],
        dest.index,
        box[src.droppableId][src.index],
      );

      // Set new box values
      const tempBox = { ...box };
      tempBox[src.droppableId] = srcItems;
      tempBox[dest.droppableId] = destItems;
      setBox({ ...tempBox });
    }
  }

  // const checkAnswer = (clientAnswer: IItem[], correctAnswer: IAnswer[]) => {
  //   clientAnswer.map((item, index) => {
  //     if (
  //       item.type === correctAnswer[index].type &&
  //       item.content === correctAnswer[index].content
  //     ) {
  //       setCorrect(correct + 1);
  //       handlePlayCorrectSound();
  //     } else {
  //       setWrong(wrong + 1);
  //       handlePlayWrongSound();
  //     }
  //   });
  // };

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex select-none gap-4 max-[600px]:flex-col">
          <DroppableContainerSelect header="Select" box={box.select} />
          <div className="bg-gray-200">
            <div className="flex min-h-16 flex-col items-center gap-4 px-5 py-4">
              <h1 className="text-center text-2xl font-bold uppercase">
                Answer
              </h1>
              <div className="min-w-40 border border-b-[1.25rem] border-l-[.75rem] border-r-0 border-orange-400 text-white">
                <div className="bg-orange-400 py-1 font-bold uppercase">
                  loop
                </div>
                <div className="min-h-16 bg-white">
                  <DroppableContainerAnswer header="Answer" box={box.answer} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </DragDropContext>
      <button
        className="my-2 me-2 w-28 rounded-lg bg-lime-400 bg-gradient-to-r px-5 py-2.5 text-center text-sm font-medium shadow-lg shadow-lime-500/50 hover:bg-lime-300 hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-lime-300"
        onClick={() => {
          checkAnswer(box.answer, initialData.answer);
        }}
      >
        Submit
      </button>
    </>
  );
};
