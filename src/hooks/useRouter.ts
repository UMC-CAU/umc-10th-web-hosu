import { useState, useEffect, useCallback } from "react";

export function useRouter() {
  // window.loaction.pathname : 현재 브라우저 URL에서 경로(path)만 반환하는 속성
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    // popstate 이벤트 발생 시 현재 URL 경로를 읽어 path state를 업데이트
    const onPopState = () => setPath(window.location.pathname);
    // 브라우저에 popstate 이벤트 리스너를 등록
    window.addEventListener("popstate", onPopState);
    // 클린업 : 컴포넌트가 언마운트될 때 리스너 제거 후 메모리 누수 방지
    return () => window.removeEventListener("popstate", onPopState);
  }, []); // 빈 의존성 배열: 마운트 시 한 번만 생성

  // 컴포넌트가 리렌더링될 때마다 내부 함수는 매번 새로 생성됨
  // useCallback: 의존성이 변하지 않는 한 같은 함수 참조를 재사용함
  // push 함수를 자식 컴포넌트에 props로 전달할 때, 매번 새 함수가 생성되면 자식이 불필요하게 리렌더링
  // 이를 방지하는 역할
  const push = useCallback((to: string) => {
    window.history.pushState(null, "", to);
    setPath(to);
  }, []); // 두 번째 인자 []는 의존성 배열. 
  // []: 마운트 시 한 번만 생성
  // [a, b]: a 또는 b가 변할 때만 새로 생성

  return { path, push };
}
