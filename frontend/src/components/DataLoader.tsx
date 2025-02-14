import { useState } from "react";

import { fetchTodos } from "../utils/fetchData";
import { Todo } from "../types";

export default function DataLoader() {
  const [posts, setPosts] = useState<Todo[]>([]);

  if (!posts.length) {
    const initialFunc = async () => {
      try {
        const todos = await fetchTodos("http://localhost:8000/api/posts?test=true");
        console.log("todosは", todos);
        setPosts(todos);

        // 一応delayエンドポイントも叩いてみる
        const a = await fetch('https://httpbin.org/delay/3');
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
      <h1>DataLoader Component</h1>
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
