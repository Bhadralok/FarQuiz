// Layout.jsx
import { Outlet, useNavigation } from "react-router-dom";
import { SpinLoading } from "respinner";

export default function Layout() {
  const navigation = useNavigation();

  const isLoading = navigation.state === "loading";

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="">
            <SpinLoading color="#777" borderRadius={4} count={12} />
          </div>
        </div>
      )}

      <Outlet />
    </>
  );
}
