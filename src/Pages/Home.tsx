import { useEffect, useState } from "react";
import logo from "../assets/quiz.png";
import general from "../assets/General.png";
import animal from "../assets/animals.png";
import history from "../assets/History.png";
import science from "../assets/science.png";
import game from "../assets/Game.png";
import { useNavigate, Link } from "react-router-dom";
import background from "../assets/Background.png";
import { useNeynarContext } from "@neynar/react";
import { sdk } from "@farcaster/miniapp-sdk";

export default function Home() {
  const navigate = useNavigate();

  const { user, signIn, isAuthenticated } = useNeynarContext();

  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState<string | null>(null);
  const [farcasterAddress, setFarcasterAddress] = useState<string | null>(null);

  // splash loader
  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(t);
  }, []);

  // Handle Neynar auth
  useEffect(() => {
    if (!isAuthenticated || !user) return;

    const evmAddress = user.verifications?.find(
      (v) => typeof v === "string" && v.startsWith("0x")
    );

    if (evmAddress) {
      setFarcasterAddress(evmAddress);
    }
  }, [isAuthenticated, user]);

  // FARCASTER AUTH (not wallet connect)
  const connectFarcaster = async () => {
    try {
      await signIn();
    } catch (error) {
      console.error(error);
      setResult("Authentication cancelled");
    }
  };

  // ADD MINI APP (CORRECT METHOD)
  const addMiniAppToFarcaster = async () => {
    try {
      if (!sdk?.actions?.addMiniApp) {
        setResult("Not running inside Farcaster");
        return;
      }

      await sdk.actions.addMiniApp();
      setResult("Mini App added successfully");
    } catch (error) {
      console.error(error);
      setResult("Mini App already added or rejected");
    }
  };

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

  return (
    <div className="flex h-screen flex-col bg-green-200 items-center pb-20">
      {result && <p>{result}</p>}

      {/* FARCASTER AUTH BUTTON */}
      <div className="w-full flex items-end justify-end pt-3 pr-10">
        <button
          onClick={connectFarcaster}
          disabled={isAuthenticated}
          className={`w-fit px-3 py-2 shadow-xl rounded-full text-[10px] font-medium ${
            isAuthenticated
              ? "bg-green-200 text-green-800"
              : "bg-red-200 text-red-800"
          }`}
        >
          {isAuthenticated
            ? `Farcaster Connected${
                farcasterAddress
                  ? ` (${farcasterAddress.slice(
                      0,
                      6
                    )}...${farcasterAddress.slice(-4)})`
                  : ""
              }`
            : "Sign in with Farcaster"}
        </button>
      </div>

      {/* MENU */}
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
      <div className="flex flex-col gap-2 items-center ">
        <Link to={"/leaderboard"}>
          <button className="menu-btn bg-black">Leaderboard</button>
        </Link>
        <button className="menu-btn bg-black" onClick={addMiniAppToFarcaster}>
          Add Miniapp
        </button>

        <p className="font-bold text-[12px] text-black/40">
          built by Bhadralok
        </p>
      </div>
    </div>
  );
}
