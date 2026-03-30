interface LinkProps {
  to: string;
  children: React.ReactNode;
}

export function Link({ to, children }: LinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault(); // a 태그 클릭 시 페이지 이동 + 새로고침을 막음
    window.history.pushState(null, "", to);
    window.dispatchEvent(new PopStateEvent("popstate")); // popstate 이벤트 수동으로 발생시킴
  };

  return (
    <a href={to} onClick={handleClick}>
      {children}
    </a>
  );
}
