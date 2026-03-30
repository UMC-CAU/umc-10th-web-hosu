import { Link } from "../components/Link";

export function NotFoundPage() {
  return (
    <div>
      <h1>404</h1>
      <p>페이지를 찾을 수 없습니다.</p>
      <Link to="/">Home으로 돌아가기</Link>
    </div>
  );
}
