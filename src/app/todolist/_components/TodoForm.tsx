"use client";
import { Todo } from "@/types/todo.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormEventHandler, useState } from "react";

export default function TodoForm() {
  const [title, setTitle] = useState<string>("");
  const [contents, setContents] = useState<string>("");

  const queryClient = useQueryClient();
  const addMutation = useMutation<unknown, Error, Todo>({
    mutationFn: async (newTodo) => {
      const response = await fetch("http://localhost:4000/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      });
      if (!response.ok) {
        throw new Error(`Failed to post todo`);
      }
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const handleAddTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setTitle("");
    setContents("");
    addMutation.mutate({
      id: Date.now().toString(),
      title,
      contents,
      isCompleted: false,
      imgPath: "https://picsum.photos/50/50",
      createdAt: Date.now(),
    });
  };

  return (
    <form className="todo-form" onSubmit={handleAddTodo}>
      <div className="form-group">
        <label htmlFor="title">제목:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="contents">내용:</label>
        <input
          id="contents"
          name="contents"
          value={contents}
          onChange={(e) => setContents(e.target.value)}
          required
          className="form-input"
        />
      </div>
      <button type="submit" className="submit-button">
        추가하기
      </button>
    </form>
  );
}
