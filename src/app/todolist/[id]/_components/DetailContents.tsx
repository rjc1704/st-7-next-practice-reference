// _components/DetailContents.tsx
"use client";

import { useQuery } from "@tanstack/react-query";
import { getDetail } from "@/api/todos";

type Props = {
  id: string;
};

export default function DetailContents({ id }: Props) {
  const { data, isPending, error } = useQuery({
    queryKey: ["todos", id],
    queryFn: getDetail,
  });

  if (isPending) return <p>로딩중...</p>;
  if (error) return <p>에러 발생: {error.message}</p>;

  return (
    <div>
      <p>제목: {data.title}</p>
      <p>내용: {data.contents}</p>
      <p>작성일자: {new Date(data.createdAt).toDateString()}</p>
    </div>
  );
}
