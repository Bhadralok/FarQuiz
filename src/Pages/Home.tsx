import { useEffect, useState } from "react";
import logo from "../assets/quiz.png";
import general from "../assets/General.png";
import animal from "../assets/animals.png";
import history from "../assets/History.png";
import science from "../assets/science.png";
import game from "../assets/Game.png";
import { useNavigate } from "react-router-dom";

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
      <div className="flex items-center justify-center h-screen w-screenz">
        <div className="flex flex-col size-28">
          <img src={logo} alt="" />
        </div>
      </div>
    );

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
          className="menu-btn bg-animal "
          style={{ backgroundImage: `url(${animal})` }}
        >
          <h2>Animals</h2>
        </button>
        <button
          className="menu-btn bg-history  "
          style={{ backgroundImage: `url(${history})` }}
        >
          <h2 className="text-history-text">History</h2>
        </button>
        <button
          className="menu-btn bg-science  "
          style={{ backgroundImage: `url(${science})` }}
        >
          <h2 className="">Science</h2>
        </button>
        <button
          className="menu-btn bg-game  "
          style={{ backgroundImage: `url(${game})` }}
        >
          <h2 className="">Video Games</h2>
        </button>
      </div>
      <p className="font-bold">built by Bhadralok</p>
    </div>
  );
}
