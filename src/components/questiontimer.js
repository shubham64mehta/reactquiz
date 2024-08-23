import { useEffect, useState } from "react";

const Questiontimer = ({ timeout, onTimeOut }) => {
  const [remainingTime, setRemainingTime] = useState(timeout);
  useEffect(() => {
    // console.log("setting timeout");
    const out = setTimeout(onTimeOut, timeout);
    return () => {
      clearTimeout(out);
    };
  }, [timeout, onTimeOut]);
  useEffect(() => {
    // console.log("setting interval");
    const out = setInterval(() => {
      setRemainingTime((prevState) => {
        return prevState - 100;
      });
    }, 100);
    return () => {
      clearInterval(out);
    };
  }, []);
  return (
    <progress id="question-time" max={timeout} value={remainingTime}></progress>
  );
};
export default Questiontimer;
