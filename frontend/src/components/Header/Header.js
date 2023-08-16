

import './Header.css'
import './Header-responsive.css'
import { Link, useNavigate } from 'react-router-dom';
import { FaTrashAlt } from "react-icons/fa";
import { Link as SearchResultLink } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";
import { useState } from 'react';


const Header = ({ cart, onDeleteProduct, onDecreaseQuantity, onIncreaseQuantity,
  comboDishes,
  pizzaDishes,
  chickenDishes,
  appetizerDishes,
  pastaDishes,
  saladDishes,
  drinkDishes }) => {

  const isLoggedIn = localStorage.getItem('successLogin') === 'true';


  // Function search

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const dishCategories = {
    comboDishes,
    pizzaDishes,
    chickenDishes,
    appetizerDishes,
    pastaDishes,
    saladDishes,
    drinkDishes
  };

  const filteredDishes = searchTerm
    ? Object.keys(dishCategories).reduce((result, category) => {
      const dishes = dishCategories[category].filter((dish) => {
        return dish.title.toLowerCase().includes(searchTerm.toLowerCase());
      });

      if (dishes.length > 0) {
        result[category] = dishes;
      }

      return result;
    }, {})
    : {};



  const lengthCart = cart.length;
  const getTotalPrice = (cart) => {
    let totalPrice = 0;
    for (let i = 0; i < cart.length; i++) {
      const cartItem = cart[i];
      totalPrice += cartItem.price * cartItem.quantity;
    }
    return totalPrice;
  };
  const totalPrice = getTotalPrice(cart).toLocaleString('vi', { style: 'currency', currency: 'VND' });

  const navigate = useNavigate();
  const onNavigateToProductDetail = () => {
    const to = `/cart`;
    navigate(to);
  };



  const cartContainer = cart.map((cartItem) => {
    const { title, image, price, id, quantity } = cartItem;


    return <div className='cart-item d-flex justify-content-between gap-5 px-5 py-4'>
      <div className="cart-img w-25"><img className='header-cart-item-img' src={image} alt={title} /></div>
      <div className='cart-item-info w-75 d-flex flex-column gap-3'>
        <div className='d-flex justify-content-between'>
          <div className="cart-name">{title}</div>
          <button className="close" onClick={() => onDeleteProduct(id)}><FaTrashAlt className='trash' /></button>
        </div>
        <div className='d-flex justify-content-between align-items-center cart-quantity-container '>
          <div className="quantity-item">
            <button
              style={{ background: "#0b603d", padding: "5px 10px", marginRight: "5px" }}
              className="btn btn-primary btn-sm btn-cart-items"
              onClick={() => onDecreaseQuantity(id)}
            >
              -
            </button>
            <span style={{ fontSize: "1.3rem" }}> {quantity}</span>
            <button
              style={{ background: "#0b603d", padding: "5px 10px", marginLeft: "10px" }}
              className="btn btn-primary btn-sm btn-cart-items"
              onClick={() => onIncreaseQuantity(id)}
            >
              +
            </button>
          </div>
          <div className="price-item">{price.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</div>
        </div>
      </div>
    </div>
  })


  //Handle log out button
  const handleLogout = async () => {
    try {

      const response = await fetch('http://localhost:5000/account/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
          // Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.ok) {
        localStorage.removeItem('token');
        localStorage.setItem('successLogin', false)
        alert('Đăng xuất thành công')
        window.location.href = '/'
      } else {
        console.error('Logout failed.');
      }
    }
    catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div className="header">
      <nav className="navbar navbar-expand-lg">
        <div className="navbar-brand">
          <Link to="/"><img className='header-logo' src="/logo.png" /></Link>
        </div>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav gap-3 rounded-pill">
            <li className="nav-item active">
              <Link className="nav-link" to="/">Trang chủ</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about-us">Về chúng tôi</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/menu">Menu</Link>
            </li>
          </ul>
        </div>

        <div className='search-and-cart'>
          {/* Search */}
          <div className="search-container">
            <input
              type="text"
              placeholder="Tìm kiếm..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-input"

            />
            <div className="search-icon">
              <FaSearch />
            </div>

          </div>


          {Object.keys(filteredDishes).map((category) => (
            <div key={category} className="search-results">
              {filteredDishes[category].map((dish) => (
                <SearchResultLink to={`/dish-details/${dish.id}`} key={dish.id} className="search-result-item">
                  {dish.title}
                </SearchResultLink>
              ))}
            </div>
          ))}


          <button className='btn rounded-pill cart-btn d-flex align-items-center gap-1' data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
            <i className="fa fa-shopping-cart mr-2"></i>
            Giỏ hàng
            <span className='cart-quantity'>{lengthCart}</span>

          </button>

          <div className="cart-container collapse" id="collapseExample">
            {cartContainer}
            {
              lengthCart ? (
                <div className=' py-4 px-5' style={{ backgroundColor: "var(--background-color-1)" }}>
                  <div className='total-price pb-4'>
                    <h4>Tổng tiền: </h4>
                    <span className='totalPrice'>{totalPrice} </span>
                  </div>
                  <button onClick={onNavigateToProductDetail} className='btn-checkout rounded-pill py-3' data-bs-dismiss="collapse">Thanh toán</button>
                </div>

              )
                : (<p className='content-cart'>Chưa có sản phẩm trong giỏ hàng!</p>)
            }

          </div>

          {/* Account button */}
          <div className="dropdown">
            <button
              className="btn dropdown-toggle account-btn"
              type="button"
              id="accountDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
             <i class="material-icons">account_circle</i>
            </button>
            <ul className="dropdown-menu" aria-labelledby="accountDropdown">
              <li>
                <a className="dropdown-item" href={isLoggedIn ? '/admin' : '/account/login'}>
                  {isLoggedIn ? 'Tài khoản' : 'Đăng nhập'}
                </a>
              </li>
              <li>
                <a className="dropdown-item" role= "button" href={isLoggedIn ? null : '/account/register'}
                  onClick={isLoggedIn ? handleLogout : null}>
                  {isLoggedIn ? 'Đăng xuất' : 'Đăng ký'}
                </a>
              </li>
            </ul>
          </div>
        </div>


      </nav>
    </div>
  )
}

export default Header;