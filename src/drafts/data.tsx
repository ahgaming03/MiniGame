import { WheelData } from "react-custom-roulette/dist/components/Wheel/types";
import { IQuest } from "../types";

export const wheelData: WheelData[] = [
  {
    option: "Model 1",
    style: { backgroundColor: "red" },
  },
  {
    option: "Model 2",
    style: { backgroundColor: "blue" },
  },
  {
    option: "Model 3",
    style: { backgroundColor: "green" },
  },
  {
    option: "Model 4",
    style: { backgroundColor: "yellow" },
  },
  {
    option: "Model 5",
    style: { backgroundColor: "purple" },
  },
  {
    option: "Model 1",
    style: { backgroundColor: "red" },
  },
  {
    option: "Model 2",
    style: { backgroundColor: "blue" },
  },
  {
    option: "Model 3",
    style: { backgroundColor: "green" },
  },
  {
    option: "Model 4",
    style: { backgroundColor: "yellow" },
  },
  {
    option: "Model 5",
    style: { backgroundColor: "purple" },
  },
];

export const modelQuestions: IQuest[] = [
  {
    id: "m1",
    imagePath: "/images/Model_1.png",
    description: (
      <>
        <p>This is a design used for blinking LED lights.</p>
      </>
    ),
    question: {
      select: [
        {
          id: "m1l1",
          type: "LED",
          content: "ON",
        },
        {
          id: "m1l2",
          type: "LED",
          content: "ON",
        },
        {
          id: "m1l3",
          type: "LED",
          content: "OFF",
        },
        {
          id: "m1l4",
          type: "LED",
          content: "OFF",
        },
        {
          id: "m1d1",
          type: "Delay",
          content: "1",
        },
        {
          id: "m1d2",
          type: "Delay",
          content: "1",
        },
      ],
      answer: [],
    },
    answer: [
      { type: "LED", content: "ON" },
      { type: "Delay", content: "1" },
      { type: "LED", content: "OFF" },
      { type: "Delay", content: "1" },
    ],
  },
  {
    id: "m2",
    imagePath: "/images/Model_2.png",
    description: (
      <>
        <p>
          This is a design used for a traffic light system. It has 3 lights:
          red, yellow, and green
          <br />
          Make the lights turn on and off in the following order:
          <br />
          Turn <span className="font-bold text-green-500">Green LED</span> "ON"
          in 5 seconds
          <br />
          Turn <span className="font-bold text-yellow-500">
            Yellow LED
          </span>{" "}
          "ON" in 2 seconds
          <br />
          Turn <span className="font-bold text-red-500">Red LED</span> "ON" in 3
          seconds
        </p>
      </>
    ),
    question: {
      select: [
        {
          id: "m2l1",
          type: "LED",
          content: "RED ON",
          bg: "bg-red-500",
        },
        {
          id: "m2l2",
          type: "LED",
          content: "GREEN ON",
          bg: "bg-green-500",
        },
        {
          id: "m2l3",
          type: "LED",
          content: "YELLOW ON",
          bg: "bg-yellow-500",
        },
        {
          id: "m2l4",
          type: "LED",
          content: "RED OFF",
          bg: "bg-red-500",
        },
        {
          id: "m2l5",
          type: "LED",
          content: "GREEN OFF",
          bg: "bg-green-500",
        },
        {
          id: "m2l6",
          type: "LED",
          content: "YELLOW OFF",
          bg: "bg-yellow-500",
        },
        {
          id: "m2d1",
          type: "Delay",
          content: "1",
        },
        {
          id: "m2d2",
          type: "Delay",
          content: "2",
        },
        {
          id: "m2d3",
          type: "Delay",
          content: "3",
        },
        {
          id: "m2d4",
          type: "Delay",
          content: "4",
        },
        {
          id: "m2d5",
          type: "Delay",
          content: "5",
        },
      ],
      answer: [],
    },
    answer: [
      { type: "LED", content: "GREEN ON" },
      { type: "Delay", content: "5" },
      { type: "LED", content: "GREEN OFF" },
      { type: "LED", content: "YELLOW ON" },
      { type: "Delay", content: "2" },
      { type: "LED", content: "YELLOW OFF" },
      { type: "LED", content: "RED ON" },
      { type: "Delay", content: "3" },
      { type: "LED", content: "RED OFF" },
    ],
  },
  {
    id: "m3",
    imagePath: "/images/Model_3.png ",
    description: (
      <>
        <p>
          This is a design used for press a button to turn on the LED light and
          turn off the LED light when the button is released.
        </p>
      </>
    ),
    question: {
      select: [
        {
          id: "m3l1",
          type: "LED",
          content: "ON",
        },
        {
          id: "m3l2",
          type: "LED",
          content: "OFF",
        },
        {
          id: "m3d1",
          type: "Delay",
          content: "1",
        },
        {
          id: "m3d2",
          type: "Delay",
          content: "1",
        },
        {
          id: "m3if1",
          type: "If",
          content: "Button Pressed",
        },
        {
          id: "m3else1",
          type: "Else",
          content: "",
        },
        {
          id: "m3end1",
          type: "End",
          content: "",
        },
      ],
      answer: [],
    },
    answer: [
      { type: "If", content: "Button Pressed" },
      { type: "LED", content: "ON" },
      { type: "Else", content: "" },
      { type: "LED", content: "OFF" },
      { type: "End", content: "" },
    ],
  },
  {
    id: "m4",
    imagePath: "/images/Model_4.png",
    description: (
      <>
        <p>This is a model used for turning on the LED light at night.</p>
      </>
    ),
    question: {
      select: [
        {
          id: "m4l1",
          type: "LED",
          content: "ON",
        },
        {
          id: "m4l2",
          type: "LED",
          content: "OFF",
        },
        {
          id: "m4d1",
          type: "Delay",
          content: "1",
        },
        {
          id: "m4d2",
          type: "Delay",
          content: "1",
        },
        {
          id: "m4if1",
          type: "If",
          content: "Night",
        },
        {
          id: "m4else1",
          type: "Else",
          content: "",
        },
        {
          id: "m4end1",
          type: "End",
          content: "",
        },
      ],
      answer: [],
    },
    answer: [
      { type: "If", content: "Night" },
      { type: "LED", content: "ON" },
      { type: "Else", content: "" },
      { type: "LED", content: "OFF" },
      { type: "End", content: "" },
    ],
  },
  {
    id: "m5",
    imagePath: "/images/Model_5.png",
    description: (
      <>
        <p>
          This is a model used for turning on the LED light when motion is
          detected.
        </p>
      </>
    ),
    question: {
      select: [
        {
          id: "m5l1",
          type: "LED",
          content: "ON",
        },
        {
          id: "m5l2",
          type: "LED",
          content: "OFF",
        },
        {
          id: "m5d1",
          type: "Delay",
          content: "1",
        },
        {
          id: "m5d2",
          type: "Delay",
          content: "1",
        },
        {
          id: "m5if1",
          type: "If",
          content: "Motion Detected",
        },
        {
          id: "m5else1",
          type: "Else",
          content: "",
        },
        {
          id: "m5end1",
          type: "End",
          content: "",
        },
      ],
      answer: [],
    },
    answer: [
      { type: "If", content: "Motion Detected" },
      { type: "LED", content: "ON" },
      { type: "Else", content: "" },
      { type: "LED", content: "OFF" },
      { type: "End", content: "" },
    ],
  },
];
