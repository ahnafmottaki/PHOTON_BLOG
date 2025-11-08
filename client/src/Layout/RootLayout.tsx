import Footer from "@/custom/Footer";
import Header from "@/custom/Header";
import { useAxiosEffect } from "@/custom/hooks/useAxiosEffect";
import HotToast from "@/custom/HotToast";
import { Outlet } from "react-router";
const RootLayout = () => {
  useAxiosEffect();
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
