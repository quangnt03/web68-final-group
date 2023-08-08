

import React from 'react';
import { Link } from 'react-router-dom';
import './ProductItem.css';
import './ProductItemResponsive.css'

const ProductItem = ({ productName, productImage, productPrice, productDescription, id, onAddToCart }) => {

  return (
    <div className="product-item card">
      <div className="card-img-top">
        <img src={productImage} className="card-img-top" alt={productName} />
      </div>
      <div className="card-body text-center">

        <h5 className="card-title">{productName}</h5>
        <div className='price-and-btn d-flex justify-content-center align-items-center gap-4'>
          <p className="card-text">{productPrice.toLocaleString('vi', {style : 'currency', currency : 'VND'})} </p>
          <Link to={`/dish-details/${id}`}>
            <button className="cart-item-buy-btn btn btn-primary rounded-pill">
              Mua ngay </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;




