import Banner from 'components/Banner';
import Cards from 'components/Cards';
import Footer from 'components/Footer';
import Header from 'components/Header';
import LargeCard from 'components/LargeCard';
import SmallCard from 'components/SmallCard';

export default function Home({ exploreData, cardsData }) {
  return (
    <div className="">
      <Header />
      <Banner />

      <main className="mx-auto px-8 md:px-16 py-16">
        <section className="pb-14">
          <h2 className="text-4xl font-semibold mb-4">Explore Boats</h2>

          {/* Pull some data from a server - API endpoints */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4">
            {exploreData?.map(({ img, distance, location }) => (
              <SmallCard
                key={img}
                img={img}
                distance={distance}
                search={location}
              />
            ))}
          </div>
        </section>

        <section className="pb-14">
          <h2 className="text-4xl font-semibold mb-7">Sail Anywhere</h2>

          {/* Pull some data from a server - API endpoints */}
          <div className="cards flex space-x-5 overflow-scroll scrollbar-hide p-3 -ml-3">
            {cardsData?.map(({ img, title }) => (
              <Cards key={img} img={img} title={title} />
            ))}
          </div>
        </section>

        <LargeCard
          img="https://boatabroad.com/wp-content/uploads/2021/12/alina-kacharho-86wR5GZJZdQ-unsplash.jpg"
          title="Rent your boat"
          description="Earn extra income and unlock new opportunities by sharing your boat"
          buttonText="Get Inspired"
        />
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export async function getStaticProps() {
  const exploreData = await fetch('https://jsonkeeper.com/b/NJ7H').then((res) =>
    res.json(),
  );

  const cardsData = await fetch('https://jsonkeeper.com/b/UM02').then((res) =>
    res.json(),
  );

  return {
    props: {
      exploreData,
      cardsData,
    },
  };
}
