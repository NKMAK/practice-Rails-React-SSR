import { useState } from "react";

import { Todo } from "./types";
import { fetchTodos } from "./utils/fetchData";

export default function App() {
  const [posts, setPosts] = useState<Todo[]>([]);

  if (!posts.length) {
    const initialFunc = async () => {
      try {
        const todos = await fetchTodos("http://localhost:8000/api/posts?test=true");
        console.log("todosは", todos);
        setPosts(todos);
        const a = await fetch('https://httpbin.org/delay/3');  // 3秒後に返るエンドポイント
        const b = await a.json();
        console.log('delay/3は', b);
      } catch (e) {
        console.error("catchのeはこれ", e);
      }
    };
    initialFunc();
  }

  return (
    <>
      <h1>hello world</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <p>title: {post.title}</p>
            <p>content: {post.content}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
