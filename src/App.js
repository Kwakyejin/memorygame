import { Fragment, useEffect, useLayoutEffect, useState } from "react";

const duration = 5000;

const ProblemView = ({ problem }) => (
  <Fragment>
    <div className="bg-gray-400 w-96 h-96 flex mx-auto mt-5">
      <img className="w-full h-full" src={problem?.image} />
    </div>
    <p className="mx-auto text-6xl mt-20">{problem.word}</p>
    <p className="mx-auto text-4xl mt-10">{problem.contents}</p>
  </Fragment>
);

const WordInpView = ({ listState, showState }) => {
  const [list, setList] = listState;
  const [show, setShow] = showState;
  const [value, setValue] = useState("");

  const keyPress = (key) => {
    if (key === "Enter") {
      if (value !== "") {
        setList((prev) => [...prev, value]);
        setValue("");
        setShow((prev) => prev + 1);
      }
    }
  };

  return (
    <input
      onKeyPress={(e) => keyPress(e.key)}
      className="w-full m-auto outline-none text-6xl bg-gray-200 border-b-4 border-gray-300 py-2 text-center"
      onChange={(e) => setValue(e.target.value.replace(" ", ""))}
      value={value}
    />
  );
};

const WordShowView = ({ word }) => <p className="m-auto text-6xl">{word}</p>;

const AnswerView = ({ problem }) => {
  return (
    <Fragment>
      <div className="bg-gray-400 w-96 h-96 flex mx-auto mt-5">
        <img className="w-full h-full" src={problem?.image} />
      </div>
      <input className="w-full text-center text-6xl mt-20 outline-none bg-gray-200 border-b-4 border-gray-300" />
      <p className="mx-auto text-4xl mt-6">{problem.contents}</p>
    </Fragment>
  );
};

const App = () => {
  const sampleProblem = {
    word: "신호등",
    image: "/image/traffic.png",
    contents: "차량이나 사람에게 교통 신호를 알려주는 장치",
  };

  const [problem, setProblem] = useState(sampleProblem);
  const wordListState = useState([]);
  const [wordList, setWordList] = wordListState;
  const showState = useState(0);
  const [show, setShow] = showState;

  const viewList = [
    <ProblemView problem={problem} />,
    <WordInpView listState={wordListState} showState={showState} />,
    <WordInpView listState={wordListState} showState={showState} />,
    <WordInpView listState={wordListState} showState={showState} />,
    <WordInpView listState={wordListState} showState={showState} />,
    <WordShowView word={wordList[3]} />,
    <WordShowView word={wordList[2]} />,
    <WordShowView word={wordList[1]} />,
    <WordShowView word={wordList[0]} />,
    <AnswerView problem={problem} />,
  ];

  useLayoutEffect(() => {
    if (show === 0) {
      setTimeout(() => setShow(1), duration);
    } else if (show >= 5 && show <= 8) {
      setTimeout(() => setShow((prev) => prev + 1), duration);
    }
  }, [show]);

  return (
    <div className="flex w-full h-[100vh]">
      <p>{show}</p>
      <div className="w-[50vw] h-[80vh] bg-gray-200 rounded-2xl m-auto flex flex-col p-10">
        {viewList[show]}
      </div>
    </div>
  );
};
export default App;
