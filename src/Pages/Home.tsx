import { useEffect, useState } from "react";
import logo from "../assets/quiz.png";
import general from "../assets/General.png";
import animal from "../assets/animals.png";
import history from "../assets/History.png";
import science from "../assets/science.png";
import game from "../assets/Game.png";
import { useNavigate } from "react-router-dom";
import background from "../assets/Background.png";
import { Link } from "react-router-dom";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  if (isLoading)
    return (
      <div
        className="flex items-center justify-center h-screen w-screen"
        style={{
          backgroundImage: `url('${background}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="flex flex-col size-28">
          <img src={logo} alt="" />
        </div>
      </div>
    );

  // console.log("width", window.screen.width);
  // console.log("height", window.screen.height);

  return (
    <div className="flex h-screen flex-col items-center pb-20">
      <div className="h-full w-screen flex-col gap-3.5 flex items-center justify-center">
        <p className="font-bold text-sm">Pick a quiz topic</p>
        <button
          onClick={() => navigate("/general")}
          className="menu-btn bg-general"
          style={{ backgroundImage: `url(${general})` }}
        >
          <h2>General knowledge</h2>
        </button>
        <button
          onClick={() => navigate("/animal")}
          className="menu-btn bg-animal "
          style={{ backgroundImage: `url(${animal})` }}
        >
          <h2>Animals</h2>
        </button>
        <button
          className="menu-btn bg-history  "
          onClick={() => navigate("/history")}
          style={{ backgroundImage: `url(${history})` }}
        >
          <h2 className="text-history-text">History</h2>
        </button>
        <button
          onClick={() => navigate("/science")}
          className="menu-btn bg-science  "
          style={{ backgroundImage: `url(${science})` }}
        >
          <h2 className="">Science</h2>
        </button>
        <button
          onClick={() => navigate("/game")}
          className="menu-btn bg-game  "
          style={{ backgroundImage: `url(${game})` }}
        >
          <h2 className="">Video Games</h2>
        </button>
      </div>
      <div className="flex flex-col items-center ">
        <Link to={"/leaderboard"}>
          <button className="menu-btn bg-black">Leaderboard</button>
        </Link>
        <p className="font-bold text-[12px] text-black/40">built by Bhadralok</p>
      </div>
    </div>
  );
}
