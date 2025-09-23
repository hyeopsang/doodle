import { Outlet } from "react-router";
import Header from "./header";
import Footer from "./footer";

export default function Layout() {
  return (
    <div className="w-full h-full flex flex-col items-center">
      <Header />
      <main className="pt-16 w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
