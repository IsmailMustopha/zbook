import React, { useContext, useEffect, useState } from 'react'
import Title from "./Title";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
// import required modules
import { Autoplay } from "swiper/modules";
import Item from "./Item";
import { ShopContext } from '../context/ShopContext';

const RelatedBook = ({book, id}) => {
  const [relatedBooks, setRelatedBooks] = useState([])
  const { books } = useContext(ShopContext)

  useEffect(() => {
    if (books.length > 0) {
      let booksCopy = books.slice()
      booksCopy = booksCopy.filter(
        (item) => item.category === book.category && id !== item.book_id
      );
      setRelatedBooks(booksCopy.slice(0, 6))
    }
  }, [books])

  return (
    <section className="max-padd-container py-16">
      <Title
        title1={"Related"}
        title2={"Books"}
        titleStyles={"pb-10"}
      />
      {/* CONTAINER */}
      <Swiper
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          355: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          600: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          900: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          1200: {
            slidesPerView: 5,
            spaceBetween: 20,
          },
        }}
        modules={[Autoplay]}
        className="min-h-[399px]"
      >
        {relatedBooks.map((book) => (
          <SwiperSlide key={book._id}>
            <Item book={book} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default RelatedBook