import {
  RouterProvider,
  createRoutesFromElements,
  Route,
  createHashRouter,
} from "react-router-dom";
import Home from "./Pages/Home";
import General from "./Pages/General";
import { useEffect } from "react";
import { sdk } from "@farcaster/miniapp-sdk";
import Page404 from "./Pages/Page404";
import Animal from "./Pages/Animal";

export default function App() {
  useEffect(() => {
    console.log("calling is ready");
    sdk.actions.ready();
  }, []);

  const router = createHashRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Home />}></Route>
        <Route path="/general" element={<General />} />
        <Route path="/animal" element={<Animal />} />

        <Route path="*" element={<Page404 />} />
      </>
    )
  );
  return <RouterProvider router={router} />;
}
