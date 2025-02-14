import { use } from "react";
import { Todo } from "../types";

const ShowTodos = ({ todos }: { todos: Promise<Todo[]> }) => {
  const posts = use(todos);

  return (
    <div style={{ border: '1px solid blue' }}>
      <h3>ShowTodosコンポーネント</h3>
      <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <p>title: {post.title}</p>
              <p>content: {post.content}</p>
            </li>
          ))}
      </ul>
    </div>
  )
};

export default ShowTodos;
