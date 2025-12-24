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
import { useNeynarContext } from "@neynar/react";
import { sdk } from "@farcaster/miniapp-sdk";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const navigate = useNavigate();
  const { user, signIn } = useNeynarContext();

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  useEffect(() => {
    // Check if user is already signed in with Neynar
    if (user) {
      setIsWalletConnected(true);
      // Get wallet address from user data if available
      if (user.verifications && user.verifications.length > 0) {
        setWalletAddress(user.verifications[0]);
      }
    }
  }, [user]);

  const connectWallet = async () => {
    try {
      await signIn();
      // The useEffect above will handle setting the connected state
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      setResult("Failed to connect wallet. Please try again.");
    }
  };

  const addMiniAppToFarcaster = async () => {
    try {
      await sdk.actions.addFrame();
    } catch (error) {
      console.error("Failed to add miniapp to Farcaster:", error);
    }
  };

  if (isLoading)
    return (
      <div
        className="flex items-center justify-center bg-whitea h-screen w-screen"
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
    <div className="flex h-screen flex-col bg-blue-200 items-center pb-20">
      <p>{result}</p>
      <div className="w-full flex items-end justify-end pt-3 pr-10">
        <button
          onClick={connectWallet}
          disabled={isWalletConnected}
          className={`w-fit px-3 py-2 shadow-xl rounded-full text-[10px] font-medium ${
            isWalletConnected
              ? "bg-green-200 text-green-800"
              : "bg-red-200 text-red-800"
          }`}
        >
          {isWalletConnected
            ? `Connected${walletAddress ? ` (${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)})` : ""}`
            : "Connect wallet"
          }
        </button>
      </div>
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
