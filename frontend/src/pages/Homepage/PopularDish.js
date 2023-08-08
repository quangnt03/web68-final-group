import React from 'react'
import ProductItem from '../../components/ProductItem/ProductItem'
import mockPopularDish from '../../mockData/mockPopularDish'
import { Link } from 'react-router-dom'
import { useState } from 'react'


const PopularDish = ({ onAddToCart, appetizerDishes, pizzaDishes, pastaDishes, saladDishes }) => {
  /*Navbar*/
  const PopularDishNavBar = () => {
    return (
      <div >

        <ul className="nav nav-tabs menu_tab row" id="myTab" role="tablist">
          <li className="nav-item col-3">
            <a className={`nav-link nav-option ${activeTab === 'pizza' ? 'active' : ''}`} id="pizza-tab" data-bs-toggle="tab" href="#pizza" role="tab"
              onClick={() => handleTabClick('pizza')}>Pizza</a>
          </li>
          <li className="nav-item col-3">
            <a className="nav-link nav-option" id="spaghetti-tab" data-bs-toggle="tab" href="#spaghetti" role="tab"
              onClick={() => handleTabClick('pasta')} >Mỳ Ý</a>
          </li>
          <li className="nav-item col-3">
            <a className={`nav-link nav-option ${activeTab === 'appetizer' ? 'active' : ''}`} id="appetizer-tab" data-bs-toggle="tab" role="tab" href="#appetizer"
              onClick={() => handleTabClick('appetizer')}>Khai vị</a>
          </li>
          <li className="nav-item col-3">
            <a className="nav-link nav-option" id="salad-tab" data-bs-toggle="tab" href="#salad" role="tab"
              onClick={() => handleTabClick('salad')}>Salad</a>
          </li>
        </ul>
      </div>

    )
  }

  /*Popular dish list*/
  const listPopularDish = mockPopularDish && mockPopularDish.map(dish => {
    const { title, image, price, content, id } = dish
    return (
      <ProductItem
        productName={title}
        productImage={image}
        productPrice={price}
        productDescription={content}
        id={id}
        onAddToCart={onAddToCart}
      />)
  })
  /* Khi ấn vào 1 tab thì list đồ ăn tương ứng hiện ra */
  const [activeTab, setActiveTab] = useState('pizza');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    console.log("Tab đang active là", activeTab)
  };

  /*Các món pizza */
  const popularPizzaList = pizzaDishes && pizzaDishes.filter(dish =>
    dish.isPopular === true)
  const popularPizzaRender = popularPizzaList && popularPizzaList.map(dish => {
    const { title, image, price, content, id } = dish
    return (
      <div className=' col-lg-3 col-xxl-3 col-md-6 col-sm-12'>
        <ProductItem
          productName={title}
          productImage={image}
          productPrice={price}
          productDescription={content}
          id={id}
          onAddToCart={onAddToCart}
        />
      </div>)
  })

  /*Các món mì Ý*/
  const popularPastaList = pastaDishes && pastaDishes.filter(dish =>
    dish.isPopular === true)
  console.log("Pasta popular", popularPastaList)
  console.log("All pasta", pastaDishes)
  const popularPastaRender = popularPastaList && popularPastaList.map(dish => {
    const { title, image, price, content, id } = dish
    return (
      <div className=' col-lg-3 col-md-6 col-sm-12'>
        <ProductItem
          productName={title}
          productImage={image}
          productPrice={price}
          productDescription={content}
          id={id}
          onAddToCart={onAddToCart}
        />
      </div>)
  })

  /*Các món khai vị*/
  const popularAppetizerList = appetizerDishes && appetizerDishes.filter(dish =>
    dish.isPopular === true)
  const popularAppetizerRender = popularAppetizerList && popularAppetizerList.map(dish => {
    const { title, image, price, content, id } = dish
    return (
      <div className=' col-lg-3 col-md-6 col-sm-12'>
        <ProductItem
          productName={title}
          productImage={image}
          productPrice={price}
          productDescription={content}
          id={id}
          onAddToCart={onAddToCart}
        />
      </div>)
  })

  /*Các món salad*/
  const popularSaladList = saladDishes && saladDishes.filter(dish =>
    dish.isPopular === true)
  const popularSaladRender = popularSaladList && popularSaladList.map(dish => {
    const { title, image, price, content, id } = dish
    return (
      <div className=' col-lg-3 col-md-6 col-sm-12'>
        <ProductItem
          productName={title}
          productImage={image}
          productPrice={price}
          productDescription={content}
          id={id}
          onAddToCart={onAddToCart}
        />
      </div>)
  })


  return (
    <div className='popular-dish w-75 mx-auto text-center'>
      <h2 className="title">Món ngon phải thử</h2>
      <PopularDishNavBar />
      <div className='listPopularDish row'>
        {activeTab === 'pizza' && popularPizzaRender}
        {activeTab === 'appetizer' && popularAppetizerRender}
        {activeTab === 'pasta' && popularPastaRender}
        {activeTab === 'salad' && popularSaladRender}
      </div>
      <Link className="see-all-menu" to="/menu"><i><h4>Xem toàn bộ menu
        <i class="fa fa-arrow-circle-right"></i>
      </h4></i>

      </Link>
    </div>
  )
}

export default PopularDish