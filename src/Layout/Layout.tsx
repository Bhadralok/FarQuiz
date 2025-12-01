// Layout.jsx
import { Outlet } from "react-router-dom";
import { SpinLoading } from "respinner";

export default function Layout() {
  const isLoading = navigation.state === "loading";

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="">
            <SpinLoading color="#777" borderRadius={4} count={12} />
          </div>
        </div>
      )}

      <Outlet />
    </>
  );
}
