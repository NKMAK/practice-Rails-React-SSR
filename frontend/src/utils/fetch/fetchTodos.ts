import { Todo } from "../../types";

export const fetchTodos = async(url: string): Promise<Todo[]> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('APIリクエストが失敗しました');
  }
  return response.json();
}
