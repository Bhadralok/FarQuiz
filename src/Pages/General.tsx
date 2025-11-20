import { useQuery } from "@tanstack/react-query";
import Loading from "../assets/UI/Loading";
import {
  IoChevronBackSharp,
  IoChevronForwardSharp,
  IoClose,
} from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { useEffect, useState } from "react";
import bunny from "../assets/bunny.png";
import he from "he";
import { useNavigate } from "react-router-dom";

export default function Animal() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const [styles, setStyles] = useState({
    style1: defaultStyle,
    style2: defaultStyle,
    style3: defaultStyle,
    style4: defaultStyle,
  });

  const [nextIndex, setNextIndex] = useState(0);
  const [options, setOptions] = useState<string[]>([]);

  const handleSelect = (
    selected: "style1" | "style2" | "style3" | "style4"
  ) => {
    
    const styleMap = {
      style1: 0,
      style2: 1,
      style3: 2,
      style4: 3,
    };

    const index = styleMap[selected];
    setSelectedOption(index);

    setStyles({
      style1: selected === "style1" ? selectedStyle : defaultStyle,
      style2: selected === "style2" ? selectedStyle : defaultStyle,
      style3: selected === "style3" ? selectedStyle : defaultStyle,
      style4: selected === "style4" ? selectedStyle : defaultStyle,
    });
  };

  // console.log(styles);

  const { isLoading, error, data } = useQuery({
    queryKey: ["quiz"],
    queryFn: async () => {
      const response = await fetch(
        "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple"
      );
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      return data;
    },
  });

  useEffect(() => {
    if (!data) return;

    const newOptions = [
      data.results[nextIndex].correct_answer,
      data.results[nextIndex].incorrect_answers[0],
      data.results[nextIndex].incorrect_answers[1],
      data.results[nextIndex].incorrect_answers[2],
    ];
    setOptions(newOptions.sort(() => Math.random() - 0.5));
    // console.log(newOptions.sort(()));
    
    console.log("The options", options);
    console.log(options[0]);
    console.log("Correct answer",data.results[nextIndex].correct_answer)
  }, [data?.results, nextIndex]);
  

  const navigate = useNavigate();
  
  if (isLoading)
    return (
      <div className="flex h-screen w-screen justify-center items-center">
        <Loading />
      </div>
    );
  if (error) return <div>Error occurred: {(error as Error).message}</div>;
  // console.log(data);

  const bars = Array.from({ length: 10 }, (_, i) => i);
  // length of bars determine how many bars there are... that's the length: 10 oo

  const handleClick = (index: number) => {
    setActiveIndex(index); // i think the logic to go to the next question goes here
    setNextIndex(index);
    console.log(`Go to question ${index + 1}`);
  };

  const newArray = [];
  newArray.push(data?.results[0]);
  // console.log(`new array`, newArray);

  const handleNext = () => {
    if (nextIndex === 9) return;
    setNextIndex(nextIndex + 1);
    setActiveIndex(activeIndex + 1);
    setSelectedOption(null); // reset selection
    setStyles({
      style1: defaultStyle,
      style2: defaultStyle,
      style3: defaultStyle,
      style4: defaultStyle,
    });
  };

  const onClose = () => navigate("/")

  const handlePrev = () => {
    if (nextIndex === 0) return;
    setNextIndex(nextIndex - 1);
    setActiveIndex(activeIndex - 1);
  };

  console.log("Selected option index:", selectedOption);
  console.log("Selected option value:", options[selectedOption ?? 0]);

  return (
    <div className="flex h-screen w-screen flex-col px-5 pr-10 pt-5 bg-general-background">
      <div className="flex items-center justify-between">
        <div className="size-8 outline-2 outline-white rounded-full flex items-center justify-center" onClick={onClose}>
          <IoClose size={24} color="white" />
        </div>
        <p className="text-white font-bold">{data.results[0].category}</p>
        <div>
          <GiHamburgerMenu size={24} color="white" />
        </div>
      </div>
      <div className="text-white font-bold pt-5">
        <div className="flex justify-between items-center">
          <p>Question {activeIndex + 1} </p>
          <p>{activeIndex + 1} of 10</p>
        </div>
        <div className="flex gap-1.5 items-center justify-center pt-1.5">
          {bars.map((bar, i) => (
            <div
              key={i}
              onClick={() => handleClick(i)}
              className={`w-full h-3  cursor-pointer rounded ${
                activeIndex === i
                  ? "outline-2 outline-black bg-white"
                  : "bg-black/30"
              }`}
            ></div>
          ))}
        </div>
      </div>
      <div className="py-6">
        <img src={bunny} alt="" />
      </div>
      <div className="text-white pb-11">
        <h1 className="text-3xl leading-none font-bold flex wrap-break-word flex-wrap">
          {he.decode(data?.results[nextIndex].question)}
        </h1>
      </div>
      <div className="flex h-full flex-col justify-between">
        <div className="">
          <p className="text-white font-bold tracking-wider">
            Choose your answer
          </p>
          <div className="pt-2 flex flex-col gap-2">
            <button
              className={`${styles.style1}`}
              onClick={() => handleSelect("style1")}
            >
              A. {options[0] && he.decode(options[0])}
            </button>
            <button
              className={`${styles.style2}`}
              onClick={() => handleSelect("style2")}
            >
              B. {options[1] && he.decode(options[1])}
            </button>
            <button
              className={`${styles.style3}`}
              onClick={() => handleSelect("style3")}
            >
              C. {options[2] && he.decode(options[2])}
            </button>
            <button
              className={`${styles.style4}`}
              onClick={() => handleSelect("style4")}
            >
              D. {options[3] && he.decode(options[3])}
            </button>
          </div>
        </div>
        <div className=" pt-10 flex gap-4 items-center justify-center flex-wrap w-full pb-10 px-10 text-xl">
          {nextIndex === 9 ? (
            <>
              <div>
                <button
                  className="flex items-center justify-between px-8 w-full h-[52px] gap-2 outline-2 outline-white text-white rounded-full"
                  onClick={handlePrev}
                >
                  <IoChevronBackSharp />
                  Previous
                </button>
              </div>
              <div>
                <button
                  className="flex items-center justify-between px-10 w-full h-[52px] gap-2 bg-correct text-white font-medium rounded-full"
                  onClick={() => console.log("something")}
                >
                  Submit
                  <IoChevronForwardSharp />
                </button>
              </div>
            </>
          ) : (
            <>
              <div>
                <button
                  className="flex items-center justify-between px-8 w-full h-[52px] gap-2 outline-2 outline-white text-white rounded-full"
                  onClick={handlePrev}
                >
                  <IoChevronBackSharp />
                  Previous
                </button>
              </div>
              <div>
                <button
                  className="flex items-center justify-between px-10 w-full h-[52px] gap-2 bg-white rounded-full"
                  onClick={handleNext}
                >
                  Next
                  <IoChevronForwardSharp />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const defaultStyle =
  "@apply h-[52px] w-full px-8 bg-white py-2 font-medium flex justify-start text-2xl items-center rounded-full gap-2";

const selectedStyle =
  "@apply h-[52px] w-full bg-selected py-2 outline-2 font-bold px-8 rounded-full justify-start flex items-center text-2xl outline-black gap-2";
