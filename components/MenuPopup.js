import React from 'react'

export const MenuPopup = () => {
  return (
    <div className='absolute bg-white p-0 m-0 top-[68px] right-0 w-full md:bigMenu'>
      <ul className='md:space-y-3'>
        <li className='text-gray-800 px-4 md:px-2 py-2 hover:bg-gray-100 md:hover:text-[#00BFC1] md:hover:bg-white'><a className="cursor-pointer" href="#">Login</a></li>
        <li className='text-gray-800 px-4 md:px-2 py-2 hover:bg-gray-100 md:hover:text-[#00BFC1] md:hover:bg-white'><a className="cursor-pointer" href="#">Sign up</a></li>
        <li className='text-gray-800 px-4 md:px-2 py-2 hover:bg-gray-100 md:hover:text-[#00BFC1] md:hover:bg-white'><a className="cursor-pointer" href="#">Host your boat</a></li>
        <li className='text-gray-800 px-4 md:px-2 py-2 hover:bg-gray-100 md:hover:text-[#00BFC1] md:hover:bg-white'><a className="cursor-pointer" href="#">Help</a></li>
      </ul>
    </div>
  )
}



