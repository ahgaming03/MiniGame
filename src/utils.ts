import { IItem } from "./types";

export const reorder = (
  list: IItem[],
  startIndex: number,
  endIndex: number,
) => {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  1;
  result.splice(endIndex, 0, removed);

  return result;
};

export const remove = (list: IItem[], index: number) => {
  const result = [...list];
  result.splice(index, 1);
  return result;
};

export const appendAt = (list: IItem[], index: number, pokemon: IItem) => {
  const result = [...list];
  result.splice(index, 0, pokemon);
  return result;
};
