import React from 'react'
import Hero from '../component/Hero'
import Categories from '../component/Categories'
import NewArrival from '../component/NewArrival'
import FeaturedBook from '../component/FeaturedBook'
import PopularBook from '../component/PopularBook'
import NewsLetter from '../component/NewsLetter'
import Achievements from '../component/Achievements'

const Home = () => {
  return (
    <div>
      <Hero />
      <Categories />
      <NewArrival />
      <FeaturedBook />
      <PopularBook />
      <Achievements />
      <NewsLetter />
    </div>
  )
}

export default Home