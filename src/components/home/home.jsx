import { useNavigate } from "react-router-dom";
import logoImg from "/public/frochess-logo.png";
function Home() {
  const navigate = useNavigate();
  return (
    <div>
      {" "}
      <button onClick={() => navigate("/home")}>
        <img
          src={logoImg}
          alt="Logo"
          style={{ width: "60px", height: "90px" }}
        />
      </button>
      <h1>Home</h1>
      <button onClick={() => navigate("/play")}>Play</button>
    </div>
  );
}

export default Home;
