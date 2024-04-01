import { useEffect, useRef, useState } from "react";

const CountDown = ({
  onFinish,
  start,
}: {
  onFinish: () => void;
  start: boolean;
}) => {
  const [timeLeft, setTimeLeft] = useState(0);

  const Ref = useRef<NodeJS.Timer | null>(null);

  const getTime = (): Date => {
    let deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + 10);
    return deadline;
  };

  const getRemainingTime = (deadline: Date) => {
    const total =
      Date.parse(deadline.toString()) - Date.parse(new Date().toString());
    const seconds = Math.floor((total / 1000) % 60);
    return seconds;
  };

  const startTimer = (e: Date) => {
    const seconds = getRemainingTime(e);
    if (seconds > 0) {
      setTimeLeft(seconds);
    } else if (seconds === 0 && start) {
      onFinish();
    }
  };

  const updateTimer = (time: Date) => {
    setTimeLeft(10);
    if (Ref.current) clearInterval(Ref.current);
    
    const id = setInterval(() => {
      startTimer(time);
    }, 1000);
    Ref.current = id;
  };


  useEffect(() => {

    if (start) {
      updateTimer(getTime());
    }
  }, [start]);


return (
    <div>
        {start && timeLeft > 0 && (
            <h2 style={{ color: timeLeft <= 5 ? "red" : "white" }}>
                Time left: <span style={{ fontSize: "40px" }}>{timeLeft}s</span>
            </h2>
        )}
    </div>
);
};

export default CountDown;
