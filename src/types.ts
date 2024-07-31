export interface IItem {
  id: string;
  content: string;
  type: TypeProp;
  bg?: string;
}
export interface IBox {
  [key: string]: IItem[];
}

export type TypeProp = "LED" | "Delay" | "If" | "Else" | "End";
export type StateProp = "ON" | "OFF";
export type ColorProp =
  | "red"
  | "green"
  | "blue"
  | "yellow"
  | "pink"
  | "purple"
  | "indigo"
  | "gray"
  | "black"
  | "white";

export interface IAnswer {
  type: TypeProp;
  content: string;
}

export interface IQuest {
  id: string;
  question: IBox;
  answer: IAnswer[];
  imagePath: string;
  description: React.ReactNode;
}
