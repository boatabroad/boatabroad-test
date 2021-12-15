import Image from "next/image";
import {
  SearchIcon,
  MenuIcon,
  MenuAlt4Icon,
  UsersIcon,
  UserIcon,
  GlobeAltIcon,
} from "@heroicons/react/solid";

function Header() {
  return (
    <header className="bg-white sticky top-0 z-50 grid grid-cols-3 shadow-md py-4 px-8 md:px-16">
      {/* Left - Logo */}
      <div className="flex lg:hidden relative items-center h-9 cursor-pointer my-auto">
        <Image
          src="/../public/isotipo.svg"
          layout="fill"
          objectFit="contain"
          objectPosition="left"
        />
      </div>
      <div className="hidden lg:flex relative items-center h-5 cursor-pointer my-auto">
        <Image
          src="/../public/logo.svg"
          layout="fill"
          objectFit="contain"
          objectPosition="left"
        />
      </div>

      {/* Middle - Search Bar */}
      <div className="flex items-center md:border-2 rounded-full py-2 md:shadow-sm">
        <input
          className=" flex-grow pl-5 bg-transparent outline-none text-sm text-gray-600 placeholder-gray-400"
          type="text"
          placeholder="start your search"
        />
        <SearchIcon className="hidden md:inline-flex h-8 bg-[#00BFC1] text-white rounded-full p-2 cursor-pointer md:mx-2" />
      </div>

      {/* Right */}
      <div className="flex space-x-6 items-center justify-end">
        {/* <p>Log in</p> */}
        <UsersIcon className="h-6 cursor-pointer" />
        <MenuAlt4Icon className="h-8 cursor-pointer" />
      </div>
    </header>
  )
}

export default Header
