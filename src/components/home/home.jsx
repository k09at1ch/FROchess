import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
//
  return (
    <div>
      {" "}
      <button onClick={() => navigate("/")}>
        <img
          src="/public/frochess-logo.png"
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
