import Image from "next/image";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { useState } from "react";
import {
  SearchIcon,
  MenuIcon,
  MenuAlt4Icon,
  UsersIcon,
  UserIcon,
  GlobeAltIcon,
} from "@heroicons/react/solid";
import { useRouter } from "next/router";

function Header({ placeholder }) {
  const [searchInput, setSearchInput] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [noOfSailors, setNoOfSailors] = useState(1);
  const router = useRouter();

  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };

  const resetInput = () => {
    setSearchInput("");
  };

  const search = () => {
    router.push({
      pathname: '/search',
      query: {
        location: searchInput,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        noOfSailors,
      },
    });
  };

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: 'selection'
  };

  return (
    <header className="bg-white sticky top-0 z-50 grid grid-cols-3 shadow-md py-4 px-8 md:px-16">
      {/* Left - Logo */}
      <div
        onClick={() => router.push("/")}
        className="flex lg:hidden relative items-center h-9 cursor-pointer my-auto">

        <Image
          src="/img/isotipo.svg"
          layout="fill"
          objectFit="contain"
          objectPosition="left"
        />
      </div>
      <div
        onClick={() => router.push("/")}
        className="hidden lg:flex relative items-center h-5 cursor-pointer my-auto">
        <Image
          src="/img/logo.svg"
          layout="fill"
          objectFit="contain"
          objectPosition="left"
        />
      </div>

      {/* Middle - Search Bar */}
      <div className="flex items-center md:border-2 rounded-full py-2 md:shadow-sm">
        <input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className=" flex-grow pl-5 bg-transparent outline-none text-sm text-gray-600 placeholder-gray-400"
          type="text"
          placeholder={placeholder || "start your search"}
        />
        <SearchIcon className="hidden md:inline-flex h-8 bg-[#00BFC1] text-white rounded-full p-2 cursor-pointer md:mx-2" />
      </div>

      {/* Right */}
      <div className="flex space-x-6 items-center justify-end">
        {/* <p>Log in</p> */}
        <UsersIcon className="h-6 cursor-pointer" />
        <MenuAlt4Icon className="h-8 cursor-pointer" />
      </div>

      {searchInput && (
        <div className="flex flex-col col-span-3 mx-auto mt-5 max-w-full">
          <DateRangePicker
            ranges={[selectionRange]}
            minDate={new Date()}
            rangeColors={["#00BFC1"]}
            onChange={handleSelect}
          />

          <div className="flex items-center border-b mb-4">
            <h2 className="text-2xl font-semibold flex-grow">Number of Sailors</h2>
            <UsersIcon className="h-5" />
            <input
              value={noOfSailors}
              onChange={e => setNoOfSailors(e.target.value)}
              min={1}
              className="w-12 pl-4 text-lg text-red-500 outline-none"
              type="number"
            />
          </div>

          <div className="flex ">
            <button onClick={resetInput} className="flex-grow text-red-500">Cancel</button>
            <button onClick={search} className="flex-grow text-gray-500">Search</button>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
