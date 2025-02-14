/// このファイルにfetch関連を全部まとめる

import { Todo } from "../types";

export async function fetchTodos(url: string): Promise<Todo[]> {
  const response = await fetch(url);
  if (!response.ok) {
    console.error('APIリクエストが失敗しました');
  }
  return response.json();
}
