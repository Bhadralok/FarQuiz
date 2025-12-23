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
import * as MiniApp from "@farcaster/miniapp-sdk";

declare global {
  interface Window {
    sdk?: any; // Or a more specific type if you have SDK typings
  }
}

export default function Home() {
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<number>(0);
  const [connected, setConnected] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const navigate = useNavigate();

  const sdk = MiniApp.default || MiniApp;

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  console.log(sdk.actions.addMiniApp());

  async function connectEthereumWallet() {
    try {
      setStatus("Connecting...");

      let ethProvider: any = null;

      // First: check for Farcaster mini app provider
      if (window.sdk?.wallet?.getEthereumProvider) {
        ethProvider = await window.sdk.wallet.getEthereumProvider();
        console.log("Using Farcaster mini app wallet provider");
      } else if ((window as any).ethereum) {
        ethProvider = (window as any).ethereum;
        console.log("Using window.ethereum");
      }

      if (!ethProvider) {
        window.open("https://metamask.io/download/", "_blank");
        setStatus("No Ethereum provider available");
        return;
      }

      // Request wallet accounts
      const accounts: string[] = await ethProvider.request({
        method: "eth_requestAccounts",
      });
      const addr = accounts?.[0];
      if (!addr) {
        setStatus("No Ethereum account found");
        return;
      }
      setAddress(addr);
      setConnected(true);
      setStatus("Wallet connected: " + addr);

      // Optionally check and log if running inside a Farcaster mini app
      const insideMiniApp = window.sdk?.isInMiniApp
        ? await window.sdk.isInMiniApp()
        : false;
      console.log("Inside Mini App?", insideMiniApp);
    } catch (err) {
      setStatus("Wallet connection failed");
      setResult("Wallet connection failed");
      console.error(err);
    }
  }

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
    <div className="flex h-screen flex-col items-center pb-20">
      <p>{result}</p>
      <div className="w-full flex items-end justify-end pt-3 pr-10">
        <button
          onClick={connectEthereumWallet}
          className="w-fit px-3 py-2 shadow-xl rounded-full text-[10px] font-medium  bg-red-200"
        >
          Connect wallet
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
      <div className="flex flex-col items-center ">
        <Link to={"/leaderboard"}>
          <button className="menu-btn bg-black">Leaderboard</button>
        </Link>
        <p className="font-bold text-[12px] text-black/40">
          built by Bhadralok
        </p>
      </div>
    </div>
  );
}
