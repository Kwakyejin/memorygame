import { Fragment, useLayoutEffect, useState } from "react";

const firstDuration = 5000;
const wordDuration = 2000;
const answerDuration = 2000;

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
      placeholder="연상되는 단어를 입력해주세요"
      value={value}
    />
  );
};

const WordShowView = ({ wordList, showState }) => {
  const [time, setTime] = useState(0);
  const [show, setShow] = showState;
  useLayoutEffect(() => {
    if (time == 0) {
      setTimeout(() => setTime(1), wordDuration);
    } else if (time >= wordList.length) {
      setShow((prev) => prev + 1);
    } else {
      setTimeout(() => setTime((prev) => prev + 1), wordDuration);
    }
  }, [time]);
  return (
    <div className="grid grid-cols-2 gap-0 w-full h-full">
      {wordList.slice(0, time + 1).map((word) => (
        <div key={word} className="w-full h-full flex">
          <p className="m-auto text-6xl text-center">{word}</p>
        </div>
      ))}
    </div>
  );
};

const AnswerView = ({ problem, showState }) => {
  const [show, setShow] = showState;
  const [value, setValue] = useState("");
  const [state, setState] = useState("none");

  const keyPress = (key) => {
    if (key === "Enter") {
      if (value !== "") {
        if (value === problem.word) {
          setState("correct");
        } else {
          setState("wrong");
        }
      }
    }
  };

  useLayoutEffect(() => {
    if (state === "correct") {
      setTimeout(() => setShow(0), answerDuration);
    } else if (state === "wrong") {
      setTimeout(() => setState("none"), answerDuration);
    }
  }, [state]);

  return (
    <Fragment>
      <div className="bg-gray-400 w-96 h-96 flex mx-auto mt-5">
        <img className="w-full h-full" src={problem?.image} />
      </div>
      {state === "none" && (
        <input
          placeholder="정답을 입력해주세요"
          onKeyPress={(e) => keyPress(e.key)}
          value={value}
          onChange={(e) => setValue(e.target.value.replace(" ", ""))}
          className="w-full text-center text-6xl mt-20 outline-none bg-gray-200 border-b-4 border-gray-300"
        />
      )}
      {state === "correct" && (
        <p className="w-full text-center text-6xl mt-20 mb-4 text-green-500">
          정답입니다
        </p>
      )}
      {state === "wrong" && (
        <p className="w-full text-center text-6xl mt-20 mb-4 text-red-500">
          틀렸습니다
        </p>
      )}
      <p className="mx-auto text-4xl mt-6">{problem.contents}</p>
    </Fragment>
  );
};

const App1 = () => {
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
    <WordShowView wordList={wordList} showState={showState} />,
    <AnswerView problem={problem} showState={showState} />,
  ];

  useLayoutEffect(() => {
    if (show === 0) {
      setTimeout(() => setShow(1), firstDuration);
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
export default App1;
