import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Loading = () => {
  const navigate = useNavigate()
  let { search } = useLocation();
  const query = new URLSearchParams(search);
  const nextUrl = query.get("next");

  useEffect(() => {
    if (nextUrl) {
      setTimeout(() => {
        navigate(`${nextUrl}`);
      }, 5000);
    }
  }, [nextUrl]);

  return (
    <div className="flexCenter h-screen">
      <div className="animate-spin h-24 w-24 border-4 border-gray-300 border-t-secondary rounded-full"></div>
    </div>
  );
};

export default Loading;
