import { IItem, TypeProp } from "../../types";
import { Draggable } from "react-beautiful-dnd";
import { StrictModeDroppable } from "./StrictModeDroppable";
import { BoxLED } from "../Items/BoxLED";
import { BoxDelay } from "../Items/BoxDelay";
import { BoxIf } from "../Items/BoxIf";
import { BoxElse } from "../Items/BoxElse";
import { BoxEnd } from "../Items/BoxEnd";

interface IContainer {
  header: string;
  box: IItem[];
}
export const getBox = (type: TypeProp, content: string, bg?: string) => {
  switch (type) {
    case "LED":
      return <BoxLED state={content} bg={bg} />;
    case "Delay":
      return <BoxDelay time={content} />;
    case "If":
      return <BoxIf condition={content} />;
    case "Else":
      return <BoxElse />;
    case "End":
      return <BoxEnd />;
  }
};
export default function DroppableContainerSelect({ header, box }: IContainer) {
  return (
    <>
      <div className="bg-gray-200">
        <div className="flex min-h-16 flex-col items-center gap-4 px-5 py-4">
          <h1 className="text-2xl font-bold uppercase">{header}</h1>
          <StrictModeDroppable droppableId={header.toLowerCase()} type="BOX">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <div className="flex min-h-20 min-w-48 flex-col gap-4 bg-white p-2">
                  {box.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          {getBox(item.type, item.content, item.bg)}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </StrictModeDroppable>
        </div>
      </div>
    </>
  );
}
