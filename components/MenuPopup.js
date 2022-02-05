import useUser from 'hooks/useUser';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { logOut } from 'shared/utils/firebase/logOut';
import UserPictureProfileMobile from './userPictureProfileMobile';

export const MenuPopup = () => {
  const router = useRouter();
  const { loading, user } = useUser();

  const handleLogOut = () => {
    logOut().then(() => {
      router.replace('/login');
    });
  };

  return (
    <div className="absolute bg-white p-0 m-0 top-[68px] right-0 w-full md:bigMenu">
      <ul className="md:space-y-3">
        {loading ? (
          'Loading...'
        ) : user ? (
          <>
            <UserPictureProfileMobile />
            <Link href="/dashboard" passHref>
              <li className="cursor-pointer text-gray-800 px-4 md:px-2 py-2 hover:bg-gray-100 md:hover:text-[#00BFC1] md:hover:bg-white">
                Dashboard
              </li>
            </Link>
            <li
              className="cursor-pointer text-gray-800 px-4 md:px-2 py-2 hover:bg-gray-100 md:hover:text-[#00BFC1] md:hover:bg-white"
              onClick={handleLogOut}
            >
              Log out
            </li>
          </>
        ) : (
          <>
            <Link href="/login" passHref>
              <li className="cursor-pointer text-gray-800 px-4 md:px-2 py-2 hover:bg-gray-100 md:hover:text-[#00BFC1] md:hover:bg-white">
                Login
              </li>
            </Link>
            <Link href="/ownerOrVisitor" passHref>
              <li className="cursor-pointer text-gray-800 px-4 md:px-2 py-2 hover:bg-gray-100 md:hover:text-[#00BFC1] md:hover:bg-white">
                Sign up
              </li>
            </Link>
          </>
        )}
        <Link href="#" passHref>
          <li className="cursor-pointer text-gray-800 px-4 md:px-2 py-2 hover:bg-gray-100 md:hover:text-[#00BFC1] md:hover:bg-white">
            Host your boat
          </li>
        </Link>
        <Link href="/help" passHref>
          <li className="cursor-pointer text-gray-800 px-4 md:px-2 py-2 hover:bg-gray-100 md:hover:text-[#00BFC1] md:hover:bg-white">
            Help
          </li>
        </Link>
      </ul>
    </div>
  );
};
