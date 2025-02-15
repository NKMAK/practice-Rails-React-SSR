import {  useEffect, useState } from "react";
import DataLoader from "./components/DataLoader";

import NotSuspenTodos from "./components/notSuspenseTodo";

const App = () => {
    
  
  return (
    <div style={{ border: '3px solid black' }}>
      <h1>Appコンポーネント</h1>
      <HeavyComponent />
      <NotSuspenTodos />
      <DataLoader />


    </div>
  );
}

export default App;


const HeavyComponent = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let count = 0;
    const totalIterations = 100;
    const intervalTime = 60; // 30ミリ秒ごとに更新

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
