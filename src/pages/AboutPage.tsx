import { Link } from "../components/Link";

export function AboutPage() {
  return (
    <div>
      <h1>About</h1>
      <p>이 페이지는 History API로 라우팅됩니다.</p>
      <nav>
        <Link to="/">Home으로 돌아가기</Link>
      </nav>
    </div>
  );
}
