import LargeCard from 'components/LargeCard';
import Link from 'next/link';
import React from 'react';

const index = () => {
  return (
    <div
      style={{
        padding: '2em',
      }}
    >
      <Link href="/register">
        <a>
          <LargeCard
            img="https://boatabroad.com/wp-content/uploads/2021/12/alina-kacharho-86wR5GZJZdQ-unsplash.jpg"
            title="Rent your boat?"
            description="Earn extra income and unlock new opportunities by sharing your boat"
            buttonText="Register as Owner"
          />
        </a>
      </Link>

      <br />
      <Link href="/register">
        <a>
          <LargeCard
            img="https://images.pexels.com/photos/4091042/pexels-photo-4091042.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            title="Only Visit Tour"
            description="Earn extra income and unlock new opportunities by sharing your boat"
            buttonText="Register as Visitor"
          />
        </a>
      </Link>
    </div>
  );
};

export default index;
