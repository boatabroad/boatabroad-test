import Image from "next/image";

function Cards({ img, title }) {
  return (
    <div className="cursor-pointer hover:scale-105 transform transition duration-300 ease-out">
      <div className="relative h-72 w-72 mt-5">
        <Image
          src={img}
          layout="fill"
          className="rounded-xl"
        />
      </div>
      <h3 className="text-2xl mt-3">{title}</h3>
    </div>
  )
}

export default Cards
