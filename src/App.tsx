import { useRouter } from "./hooks/useRouter";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { NotFoundPage } from "./pages/NotFoundPage";

function App() {
  const { path } = useRouter();

  return (
    <>
      {path === "/" && <HomePage />}
      {path === "/about" && <AboutPage />}
      {path !== "/" && path !== "/about" && <NotFoundPage />}
    </>
  );
}

export default App;
