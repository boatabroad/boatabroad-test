import Head from 'next/head'
import Banner from '../components/Banner'
import Cards from '../components/Cards';
import Footer from '../components/Footer';
import Header from '../components/Header'
import LargeCard from '../components/LargeCard';
import SmallCard from '../components/SmallCard';

export default function Home({ exploreData, cardsData }) {
  return (
    <div className="">
      <Head>
        <title>Boatabroad - Boat Rentals</title>
        <link rel="icon" href="/isotipo.svg" />
      </Head>

      <Header />
      <Banner />

      <main className='mx-auto px-8 md:px-16'>
        <section className="pt-10">
          <h2 className="text-4xl font-semibold pb-5">Explore Boats</h2>

          {/* Pull some data from a server - API endpoints */}
          <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {exploreData?.map(({ img, distance, location }) => (
              <SmallCard
                key={img}
                img={img}
                distance={distance}
                location={location}
              />
            ))}
          </div>
        </section>

        <section className='pt-10'>
          <h2 className='text-4xl font-semibold pb-2'>Sail Anywhere</h2>

          {/* Pull some data from a server - API endpoints */}
          <div className='flex space-x-3 overflow-scroll scrollbar-hide p-3 -ml-3'>
            {cardsData?.map(({ img, title }) => (
              <Cards
                key={img}
                img={img}
                title={title}
              />
            ))}
          </div>
        </section>

        <LargeCard
          img='https://links.papareact.com/4cj'
          title='The Greatest Outdoors'
          description='Wishlist curated by Boatabroad'
          buttonText='Get Inspired'
        />
      </main>

      <footer>
        <Footer

        />
      </footer>

    </div>
  )
}

export async function getStaticProps() {
  const exploreData = await fetch('https://links.papareact.com/pyp').
    then(
      (res) => res.json()
    );

  const cardsData = await fetch('https://links.papareact.com/zp1').
    then(
      (res) => res.json()
    );

  return {
    props: {
      exploreData,
      cardsData
    }
  }
}