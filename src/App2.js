import { Fragment, useLayoutEffect, useState } from "react";
import Mic from "./Mic";

const View = ({ showState, placeholder }) => {
  const [show, setShow] = showState;
  const [value, setValue] = useState("");

  const keyPress = (key) => {
    if (key === "Enter") {
      if (value !== "") {
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
      placeholder={placeholder}
      value={value}
    />
  );
};

const Voice = ({ showState }) => {
  const [show, setShow] = showState;
  const [recode, setRecode] = useState(0);
  useLayoutEffect(() => {
    if (recode == 2) {
      setShow((prev) => prev + 1);
    }
  }, [recode]);
  return (
    <button
      onClick={(e) => setRecode((prev) => prev + 1)}
      className="flex m-auto w-60 h-60"
    >
      <Mic
        className={"w-full h-full"}
        style={{ stroke: recode === 1 ? "#555555" : "#000000" }}
      />
    </button>
  );
};

const Read = ({ showState }) => {
  const [show, setShow] = showState;
  const [recode, setRecode] = useState(0);
  useLayoutEffect(() => {
    if (recode == 2) {
      setShow(0);
    }
  }, [recode]);
  return (
    <div className="m-auto flex flex-col">
      <p className="text-6xl mb-5 mx-auto">다음 문장을 읽어주세요</p>
      <p className="text-6xl mb-5 mx-auto">"간장공장공장장"</p>
      <button
        onClick={(e) => setRecode((prev) => prev + 1)}
        className="flex mx-auto w-60 h-60"
      >
        <Mic
          className={"w-full h-full"}
          style={{ stroke: recode === 1 ? "#ff0000" : "#000000" }}
        />
      </button>
    </div>
  );
};

const App2 = () => {
  const showState = useState(0);
  const [show, setShow] = showState;

  const viewList = [
    <View showState={showState} placeholder="올해는 몇년도 인가요?" />,
    <View showState={showState} placeholder="지금은 무슨 계절입니까?" />,
    //<Voice showState={showState} />,
    <Read showState={showState} />,
  ];

  useLayoutEffect(() => {}, [show]);

  return (
    <div className="flex w-full h-[100vh]">
      <p>{show}</p>
      <div className="w-[50vw] h-[80vh] bg-gray-200 rounded-2xl m-auto flex flex-col p-10">
        {viewList[show]}
      </div>
    </div>
  );
};

export default App2;
