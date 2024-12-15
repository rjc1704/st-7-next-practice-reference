import { Todo } from "@/types/todo.type";
import { QueryFunctionContext } from "@tanstack/react-query";

export const getDetail = async ({
  queryKey,
}: QueryFunctionContext): Promise<Todo> => {
  const [, id] = queryKey;

  const response = await fetch(`http://localhost:4000/todos/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch a detail todo ${id}`);
  }
  const todo: Todo = await response.json();
  return todo;
};
