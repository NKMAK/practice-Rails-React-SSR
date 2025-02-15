import { useEffect, useState } from "react";

interface ApiResponse {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}


const NotSuspenTodos = () => {
  const [posts, setPosts] = useState<ApiResponse[]>([]);

  useEffect(() => {
    const initialFunc = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/posts?test=true");
        // HTTPエラーをチェック (例: 404, 500)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log("responseは", response);
        const result = await response.json();
        console.log("resultは", result);
        setPosts(result);
      } catch (e) {
        console.error("catchのeはこれ", e);
      }
    };
    initialFunc();
  }, []);

  return (
    <>
      <h1>Suspenseなし</h1>
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
};

export default NotSuspenTodos;
