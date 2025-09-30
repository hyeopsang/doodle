import {Outlet} from 'react-router';
import Header from './header';
import Footer from './footer';

export default function Layout() {
  return (
    <div className="w-full h-dvh flex flex-col justify-between bg-white dark:bg-black items-center">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
