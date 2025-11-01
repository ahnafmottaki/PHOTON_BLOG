import Footer from "@/custom/Footer";
import Header from "@/custom/Header";
import HotToast from "@/custom/HotToast";
import { Outlet } from "react-router";
const RootLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <HotToast />
    </>
  );
};

export default RootLayout;
