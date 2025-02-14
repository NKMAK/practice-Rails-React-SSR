import { Suspense } from "react";
import { fetchTodos } from "../utils/fetch/fetchTodos";
import ShowTodos from "./ShowTodos";
import Fallback from "./Fallback";

export default function DataLoader() {
  const todos = fetchTodos("http://localhost:8000/api/posts?test=true");

  return (
    <>
      <h2>DataLoaderコンポーネント</h2>
      <Suspense fallback={<Fallback />}>
        <ShowTodos todos={todos} />
      </Suspense>
    </>
  );
}
