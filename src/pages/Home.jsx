import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function HomePage({ pagename }) {
  const nav = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) nav("/dashboard", { replace: true });
    else nav("/login", { replace: true });
  });
  return <h1>Hello {pagename} Page</h1>;
}
