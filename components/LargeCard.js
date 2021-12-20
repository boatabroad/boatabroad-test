import Image from "next/image";

function LargeCard({ img, title, description, buttonText }) {
  return (
    <section className=" relative cursor-pointer mb-5">
      <div className="relative h-96 min-w-[300px]">
        <Image
          src={img}
          layout="fill"
          objectFit="cover"
          className="rounded-2xl mix-blend-multiply"
          objectPosition="center 35%"
        />
        <div className="absolute h-full w-full bg-gradient-to-r from-white to-[#727272] mix-blend-multiply rounded-2xl"></div>
      </div>


      <div className="absolute bottom-[20%] left-10 md:bottom-[20%] md:left-[65%] text-white">
        <h3 className=" text-4xl md:text-5xl mb-3 w-70">{title}</h3>
        <p className="w-[80%] md:w-[70%]">{description}</p>
        {/* <button className="text-sm text-white bg-gray-900 px-4 py-2 mt-5 rounded-lg">{buttonText}</button> */}
      </div>
    </section>
  )
}

export default LargeCard
