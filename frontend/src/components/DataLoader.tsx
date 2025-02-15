import { Suspense } from "react";
import { fetchTodos } from "../utils/fetch/fetchTodos";
import Todos from "./Todos";
import Fallback from "./Fallback";

const DataLoader = () => {
  
  const todos = fetchTodos("http://localhost:8000/api/posts?test=true");

  return (
    <div style={{ border: '2px solid red' }}>
      <h2>Suspenseあり</h2>
      <Suspense fallback={<Fallback />}>
        <Todos todos={todos} />
      </Suspense>
    </div>
  );
}

export default DataLoader;
