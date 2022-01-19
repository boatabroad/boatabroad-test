import Link from 'next/link';

export const MenuPopup = () => {
  return (
    <div className="absolute bg-white p-0 m-0 top-[68px] right-0 w-full md:bigMenu">
      <ul className="md:space-y-3">
        <li className="text-gray-800 px-4 md:px-2 py-2 hover:bg-gray-100 md:hover:text-[#00BFC1] md:hover:bg-white">
          <Link href="/login">
            <a className="cursor-pointer">Login</a>
          </Link>
        </li>
        <li className="text-gray-800 px-4 md:px-2 py-2 hover:bg-gray-100 md:hover:text-[#00BFC1] md:hover:bg-white">
          <Link href="/register">
            <a className="cursor-pointer">Sign up</a>
          </Link>
        </li>
        <li className="text-gray-800 px-4 md:px-2 py-2 hover:bg-gray-100 md:hover:text-[#00BFC1] md:hover:bg-white">
          <Link href="#">
            <a className="cursor-pointer">Host your boat</a>
          </Link>
        </li>
        <li className="text-gray-800 px-4 md:px-2 py-2 hover:bg-gray-100 md:hover:text-[#00BFC1] md:hover:bg-white">
          <Link href="/help">
            <a className="cursor-pointer">Help</a>
          </Link>
        </li>
      </ul>
    </div>
  );
};
