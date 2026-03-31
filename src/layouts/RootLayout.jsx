import HeaderTop from "./HeaderTop";
import SideLeft from "./SideLeft";
import { Outlet } from "react-router";

function RootLayout() {
  return (
    <div className="size-full">
      <HeaderTop />
      <div className="flex h-[calc(100%-56px)]">
        <SideLeft />
        <div className="flex-1 p-10 box-border">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
export default RootLayout;
