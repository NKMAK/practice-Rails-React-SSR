import { use } from "react";
import { Todo } from "../types";

const ShowTodos: React.FC<{
  todos: Promise<Todo[]>
}> = ({ todos }) => {
  const posts = use(todos);

  return (
    <>
      <h3>ShowTodosコンポーネント</h3>
      <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <p>title: {post.title}</p>
              <p>content: {post.content}</p>
            </li>
          ))}
      </ul>
    </>
  )
};

export default ShowTodos;
