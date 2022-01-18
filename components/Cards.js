import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/router';

function Cards({ img, title }) {
  const [searchInput] = useState('');
  const [startDate] = useState(new Date());
  const [endDate] = useState(new Date());
  const [noOfSailors] = useState();
  const router = useRouter();

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

  return (
    <div className="cursor-pointer hover:scale-105 transform transition duration-300 ease-out">
      <div onClick={search} className="relative h-72 w-72">
        <Image src={img} layout="fill" className="rounded-xl" />
      </div>
      <h3 className="text-xl mt-3">{title}</h3>
    </div>
  );
}

export default Cards;
