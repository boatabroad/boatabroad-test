import { useRouter } from "next/router";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { format } from "date-fns";
import InfoCard from "../components/infoCard";
import Map from "../components/Map";

function Search({ searchResults }) {
  const router = useRouter();
  const { location, startDate, endDate, noOfSailors } = router.query;
  const formattedStartDate = format(new Date(startDate), "dd MMMM yy");
  const formattedEndDate = format(new Date(endDate), "dd MMMM yy");
  const dateRange = `${formattedStartDate} - ${formattedEndDate}`

  return (
    <div>
      <Header placeholder={`${location} | ${dateRange} | ${noOfSailors}`} />

      <main className="flex px-8 md:px-16">
        <section className="flex-grow pt-14 lg:mr-5">
          <p className="text-xs">100+ boats, from {dateRange}, for {noOfSailors} sailors</p>

          <h1 className="text-3xl font-semibold mt-2 mb-6">Boats in {location}</h1>

          <div className="hidden md:inline-flex space-x-3 mb-5 text-gray-800 whitespace-nowrap">
            <p className="button">Cancellation Flexibility</p>
            <p className="button">Type of Boat</p>
            <p className="button">Price</p>
            <p className="button">Sailors</p>
            <p className="button">More Filters</p>
          </div>

          <div className="flex flex-col">
            {searchResults.map(({ img, location, title, description, star, price, total }) => (
              <InfoCard
                key={img}
                img={img}
                location={location}
                title={title}
                description={description}
                star={star}
                price={price}
                total={total}
              />
            ))}
          </div>
        </section>

        <section className="hidden xl:inline-flex xl:min-w-[600px]">
          <Map
            searchResults={searchResults}
          />
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default Search
export async function getServerSideProps() {
  const searchResults = await fetch('https://jsonkeeper.com/b/5DZY').
    then(
      (res) => res.json()
    );

  return {
    props: {
      searchResults,
    }
  }
}
