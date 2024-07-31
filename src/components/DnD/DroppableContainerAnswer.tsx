import { IItem } from "../../types";
import { Draggable } from "react-beautiful-dnd";
import { StrictModeDroppable } from "./StrictModeDroppable";
import { getBox } from "./DroppableContainerSelect";

interface IContainer {
  header: string;
  box: IItem[];
}

export default function DroppableContainerAnswer({ header, box }: IContainer) {
  return (
    <>
      <StrictModeDroppable droppableId={header.toLowerCase()} type="BOX">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            <div className="min-h-14">
              {box.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <> {getBox(item.type, item.content, item.bg)}</>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          </div>
        )}
      </StrictModeDroppable>
    </>
  );
}
