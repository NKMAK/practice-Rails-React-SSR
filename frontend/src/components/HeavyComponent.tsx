import { useState, useEffect } from "react";

const HeavyComponent = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let count = 0;
    const totalIterations = 100;
    const intervalTime = 60;

    const interval = setInterval(() => {
      count++;
      setProgress(Math.floor((count / totalIterations) * 100));
      
      if (count >= totalIterations) {
        clearInterval(interval);
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, []);

  return <h2>重い計算を実行中... {progress}%</h2>;
};

export default HeavyComponent;
