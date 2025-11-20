import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Home from "./Pages/Home";
import General from "./Pages/General";
import { useEffect } from "react";
import { sdk } from "@farcaster/miniapp-sdk";

export default function App() {
  useEffect(() => {
    sdk.actions.ready();
  }, []);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Home />}></Route>
        <Route path="/general" element={<General />} />
      </>
    )
  );
  return <RouterProvider router={router} />;
}
