import React from 'react'
import PromotionSlider from './PromotionSlider'
import WhyUs from './WhyUs'
import './Homepage.css';
import NewDish from './NewDish';
import PopularDish from './PopularDish';
import Delivery from './Delivery';
import { useLayoutEffect } from 'react';
import './why-us-responsive.css'
import './delivery-responsive.css'
import './new-dish-responsive.css'
import './popular-dish-responsive.css'


const Homepage = ({ onAddToCart, appetizerDishes, pastaDishes, pizzaDishes, saladDishes }) => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0); // Scrolls the page to the top
  }, []);
  return (
    <div className='homepage'>
      <PromotionSlider />
      <WhyUs />
      <NewDish />
      <PopularDish
        onAddToCart={onAddToCart}
        appetizerDishes={appetizerDishes}
        pastaDishes={pastaDishes}
        pizzaDishes={pizzaDishes}
        saladDishes={saladDishes} />
      <img className='coupon-img img-fluid' src='images/homepage/coupon.jpg' alt='food-coupon' />
      <Delivery />
    </div>
  )
}

export default Homepage