import React, { useEffect } from 'react'
import './Cart.css'
import './CartResponsive.css'
import { FaTrashAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';

const Cart = ({ cart, onDeleteProduct, onDecreaseQuantity, onIncreaseQuantity }) => {
  // useEffect(() =>{onConditionalLogin();})
  useLayoutEffect(() => {
    window.scrollTo(0, 0); // Scrolls the page to the top
  }, []);
  const navigate = useNavigate();
  const onNavigateToCheckOut = () => {
    const to = `/checkout`;
    navigate(to);
    // onConditionalLogin();
  };

  const onNavigateToLoginRegisterPage = () => {
    const to = `/account/login?from=cart`;
    navigate(to);
  };
 
  const onConditionalLogin = () => {
    const successLoginStorage = JSON.parse(localStorage.getItem("successLogin"));
    
    if(successLoginStorage === true) {
      onNavigateToCheckOut();
    } else{
      onNavigateToLoginRegisterPage();
    }
  }
  
  const getTotalPrice = (cart) => {
    let totalPrice = 0;
    for (let i = 0; i < cart.length; i++) {
      const cartItem = cart[i];
      totalPrice += cartItem.price * cartItem.quantity;
    }

    return totalPrice;
  };



  const totalPrice = getTotalPrice(cart);


  const cartBodyElements = cart.map((cartItem, index) => {
    const { title, image, price, id, quantity } = cartItem;
    return (
      <div key={id} className='carts-container'>
        <div style={{ paddingTop: "20px" }} scope="row">{index + 1}.</div>
        
        <div className='image-container'>
          <img src={image} alt={title} style={{
            width: "100%", height: "auto", marginTop:"8px"
          }} />
        </div>

        <div className='content-item'>
        <h4 style={{ paddingTop: "20px"}}>{title}</h4>
        <div style={{ paddingTop: "20px" }}>{price.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</div>
        <div style={{marginTop:"10px"}}>
          <button
            style={{ background: "#0b603d" }}
            className="btn btn-primary btn-cart-items"
            onClick={() => onDecreaseQuantity(id)}
          // disabled={isDisabledDecreaseButton}
          >
            -
          </button>
          <span className="mx-2">{quantity}</span>
          <button
            style={{ background: "#0b603d" }}
            className="btn btn-primary btn-cart-items"
            onClick={() => onIncreaseQuantity(id)}
          >
            +
          </button>
        </div>
        <div style={{ paddingTop: "20px" }}>{(quantity * price).toLocaleString('vi', {style : 'currency', currency : 'VND'})}</div>
        <div className='rash-btn'> 
          <button
            style={{ background: "none", color: "#00814b", border: "none", marginTop:"8px" }}
            className="btn btn-danger"
            onClick={() => onDeleteProduct(id)}
          >
            <FaTrashAlt />
          </button>
        </div>
        </div>
        
      </div>
    )

  })
  return (
    <div>
      {cart.length > 0 ? (
        <div className="container w-75 my-5">
          <h3 className="home-shoppingCart">
            <span>Giỏ hàng của bạn</span>
          </h3>
          <div>
           
              <div>
                {cartBodyElements}
                <div className='total-prices' style={{ backgroundColor: 'var(--background-color-1' }} >
                  <div style={{ fontWeight: "600", fontSize: "1.1rem" }} colspan="2">Tổng đơn hàng:</div>
                  
                  <div style={{ fontWeight: "600", fontSize: "1.1rem" }} >{totalPrice.toLocaleString('vi', {style : 'currency', currency : 'VND'})} </div>
                  
                </div>
              </div>
            
          </div>
          <div className='w-100 d-flex justify-content-center'>
            <button className="Proceed-to-checkout rounded-pill" onClick={onConditionalLogin}>
              Thanh toán
            </button>
          </div>
        </div>
      ) : <div className="m-5 d-flex justify-content-center align-items-center">
        <h4 >Giỏ hàng của bạn chưa có sản phẩm nào, <Link to="/menu">tiếp tục mua sắm</Link></h4></div>}
    </div>
  )
}

export default Cart