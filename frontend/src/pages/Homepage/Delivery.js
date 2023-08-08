import React from 'react'
import { Link } from 'react-router-dom'

const Delivery = () => {
  return (
    <div className='delivery-container w-100' style={{ backgroundImage: "url('images/homepage/wave-background.png')" }}>
      <div className='delivery d-flex' >

        <img className="delivery-img img-fluid" src='images/homepage/delivery.png' />
        <div className='delivery-text'>
          <h2 className="title">Giao hàng tận nơi, <br /> đặt là tới liền</h2>

          <div className='delivery-benefit-item  rounded-pill d-flex  align-items-center px-3 py-2'>
            <i class="fa fa-home"></i>
            <span >Giao hàng siêu tốc trong vòng 30 phút</span>
          </div>
          <div className='delivery-benefit-item  rounded-pill d-flex align-items-center px-3 py-2'>
            <i class="fa fa-donate"></i>
            <span >Miễn phí ship với đơn hàng trên 300.000đ</span>
          </div>
          <Link to="/menu">
            <button className='btn rounded-pill w-30 order-now, order-now-btn'
            >Đặt món ngay</button>
          </Link>


        </div>
      </div>
    </div>
  )
}

export default Delivery