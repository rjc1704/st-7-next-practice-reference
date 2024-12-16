"use server";

import { Todo } from "@/types/todo.type";

export const getDetail = async (id: Todo["id"]): Promise<Todo> => {
  const response = await fetch(`http://localhost:4000/todos/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch a detail todo ${id}`);
  }
  const todo: Todo = await response.json();
  return todo;
};
