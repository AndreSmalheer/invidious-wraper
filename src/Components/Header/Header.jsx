import "./Header.css";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate()
  
  return (
    <>
      <div className="Header">
        <h1 onClick={() => navigate("/")}>Youtube</h1>
      </div>
    </>
  );
}
