import React from 'react'
import { Link } from 'react-router-dom'

const NewDish = () => {
  return (
    <section className='new-dish-container'>
      <div className="new-dish">
        <div className='new-dish-text'>
          <h2 className='title mx-0' >Pizza Chay Sốt Marinara</h2>
          <h3>Khám phá món mới, đắm chìm trong hương vị độc đáo!</h3>
          <p>
            Thưởng thức sự hòa quyện độc đáo giữa hương vị Pizza Ý truyền thống và hương vị đặc trưng của vùng biển Hawaii.
            <br />
            <br />
            Chúng tôi tự hào giới thiệu sự kết hợp giữa thịt nguội thơm ngon, xúc xích tiêu cay nồng và những lát dứa tươi mát, hoà quyện một cách hoàn hảo với sốt Thousand Island đặc trưng, tạo nên một hương vị độc đáo và hấp dẫn.
          </p>
          <button className='btn rounded-pill w-30 order-now'>
            <Link className="order-now-btn" to="/dish-details/22222">Thưởng thức ngay</Link></button>
        </div>
        <div className='new-dish-img'>
          <img className='img-fluid' src='images/homepage/new-dish.png' alt='New Dish' />
        </div>
      </div>
    </section>
  )
}

export default NewDish