import Image from 'next/image';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { useState } from 'react';
import { SearchIcon, MenuIcon, UsersIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import { MenuPopup } from './MenuPopup';

function Header({ placeholder }) {
  const [searchInput, setSearchInput] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [sailors, setSailors] = useState(1);
  const router = useRouter();
  const [menuPopup, setMenuPopup] = useState(false);

  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };

  const resetInput = () => {
    setSearchInput('');
  };

  const search = () => {
    router.push({
      pathname: '/search',
      query: {
        search: searchInput,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        sailors,
      },
    });
  };

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: 'selection',
  };

  const clickPopup = () => {
    if (menuPopup === true) {
      setMenuPopup(false);
    } else {
      setMenuPopup(true);
    }
  };

  return (
    <header className="bg-white sticky top-0 z-40 grid grid-cols-3 shadow-md py-4 px-8 md:px-16">
      {/* Left - Logo */}
      <div
        onClick={() => router.push('/')}
        className="flex lg:hidden relative items-center h-9 cursor-pointer my-auto"
      >
        <Image
          src="/icon.svg"
          layout="fill"
          objectFit="contain"
          objectPosition="left"
        />
      </div>
      <div
        onClick={() => router.push('/')}
        className="hidden lg:flex relative items-center h-5 cursor-pointer my-auto"
      >
        <Image
          src="/logo.svg"
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
          placeholder={placeholder || 'start your search'}
        />
        <SearchIcon className="hidden md:inline-flex h-8 bg-[#00BFC1] text-white rounded-full p-2 cursor-pointer md:mx-2" />
      </div>

      {/* Right */}
      <div className="flex space-x-6 items-center justify-end">
        <UsersIcon className="h-6 cursor-pointer" />
        <MenuIcon onClick={clickPopup} className="h-8 cursor-pointer" />
        {menuPopup && <MenuPopup />}
      </div>

      {searchInput && (
        <div className="flex flex-col col-span-3 mx-auto mt-5 max-w-full">
          <DateRangePicker
            ranges={[selectionRange]}
            minDate={new Date()}
            rangeColors={['#00BFC1']}
            onChange={handleSelect}
          />

          <div className="flex items-center border-b mb-4">
            <h2 className="text-2xl font-semibold flex-grow">
              Number of Sailors
            </h2>
            <UsersIcon className="h-5" />
            <input
              value={sailors}
              onChange={(e) => setSailors(e.target.value)}
              min={1}
              className="w-12 pl-4 text-lg text-red-500 outline-none"
              type="number"
            />
          </div>

          <div className="flex ">
            <button
              onClick={resetInput}
              className="flex-grow text-gray-500 button hover:bg-red-500 hover:text-white mx-1"
            >
              Cancel
            </button>
            <button
              onClick={search}
              className="flex-grow text-gray-500 button hover:bg-[#00BFC1] hover:text-white mx-1"
            >
              Search
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
