import Header from "@/custom/Header";
import HotToast from "@/custom/HotToast";
import { Outlet } from "react-router";
const RootLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <HotToast />
    </>
  );
};

export default RootLayout;
