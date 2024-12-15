import Link from "next/link";
import DetailContents from "./_components/DetailContents";

type Props = {
  params: { id: string };
};

export default function DetailPage({ params: { id } }: Props) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "20px",
      }}
    >
      <Link style={{ backgroundColor: "lightblue" }} href="/todolist">
        전체리스트 화면으로 이동
      </Link>
      <h2>상세페이지</h2>
      <DetailContents id={id} />
    </div>
  );
}
