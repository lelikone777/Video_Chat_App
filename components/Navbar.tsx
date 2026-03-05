import Image from "next/image";
import Link from "next/link";

import MobileNav from "./MobileNav";

const Navbar = () => {
  return (
    <nav className="flex-between fixed z-50 w-full bg-dark-1 px-6 py-4 lg:px-10">
      <Link href="/" className="flex items-center gap-1">
        <Image
          src="/icons/logo.svg"
          width={32}
          height={32}
          alt="yoom logo"
          className="max-sm:size-10"
        />
        <p className="text-[26px] font-extrabold text-white max-sm:hidden">
          {/* YOOM */}
          Видео Звонки
        </p>
        <p className="text-[18px] font-extrabold text-white max-sm:hidden">
          Пэт проект Алексея Калинина для видео звонков ©
        </p>
      </Link>
      <div className="flex-between gap-5">
        <div className="rounded-full bg-blue-1 px-3 py-1 text-sm font-semibold text-white">
          Demo
        </div>

        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
