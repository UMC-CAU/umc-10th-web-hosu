import { Link } from "../components/Link";

export function HomePage() {
  return (
    <div>
      <h1>Home</h1>
      <p>History API SPA 예제입니다.</p>
      <nav>
        <Link to="/about">About 페이지로</Link>
      </nav>
    </div>
  );
}
