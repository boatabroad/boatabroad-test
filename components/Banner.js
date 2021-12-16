import Image from "next/image";

function Banner() {
  return (
    <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] xl:h-[600px] 2xl:h-[700px] bg-blend-multiply">
      <Image
        src="/banner.jpg"
        layout="fill"
        objectFit="cover"
        objectPosition="bottom center"
      />
      <div className="absolute h-full w-full bg-[#000] opacity-20">

      </div>

      <div className="absolute w-1/2 md:w-1/3 bottom-0 p-8 md:px-16">
        <h1 className=" text-white text-4xl md:text-6xl lg:text-7xl font-montserrat font-semibold">Sail the World</h1>
      </div>
    </div >
  )
}

export default Banner
