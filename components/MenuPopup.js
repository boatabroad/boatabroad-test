import useUser from 'hooks/useUser';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { logOut } from 'shared/utils/firebase/logout';

export const MenuPopup = () => {
  const router = useRouter();
  const user = useUser();

  const handleLogOut = () => {
    logOut().then(() => {
      router.push('/login');
    });
  };

  return (
    <div className="absolute bg-white p-0 m-0 top-[68px] right-0 w-full md:bigMenu">
      <ul className="md:space-y-3">
        {user ? (
          <li
            className="cursor-pointer text-gray-800 px-4 md:px-2 py-2 hover:bg-gray-100 md:hover:text-[#00BFC1] md:hover:bg-white"
            onClick={handleLogOut}
          >
            <div className="cursor-pointer">Log out</div>
          </li>
        ) : (
          <>
            <li className="cursor-pointer text-gray-800 px-4 md:px-2 py-2 hover:bg-gray-100 md:hover:text-[#00BFC1] md:hover:bg-white">
              <Link href="/login">
                <a className="cursor-pointer">Login</a>
              </Link>
            </li>
            <li className="cursor-pointer text-gray-800 px-4 md:px-2 py-2 hover:bg-gray-100 md:hover:text-[#00BFC1] md:hover:bg-white">
              <Link href="/register">
                <a className="cursor-pointer">Sign up</a>
              </Link>
            </li>
          </>
        )}
        <li className="cursor-pointer text-gray-800 px-4 md:px-2 py-2 hover:bg-gray-100 md:hover:text-[#00BFC1] md:hover:bg-white">
          <Link href="#">
            <a className="cursor-pointer">Host your boat</a>
          </Link>
        </li>
        <li className="cursor-pointer text-gray-800 px-4 md:px-2 py-2 hover:bg-gray-100 md:hover:text-[#00BFC1] md:hover:bg-white">
          <Link href="/help">
            <a className="cursor-pointer">Help</a>
          </Link>
        </li>
      </ul>
    </div>
  );
};
