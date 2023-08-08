import './App.css';
import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Homepage from './pages/Homepage/Homepage';
import Footer from './components/Footer/Footer';
import AboutUs from './pages/AboutUs/AboutUs';
import Menu from './pages/Menu/Menu';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import Checkout from './components/Checkout/Checkout';
import Cart from './components/Cart/Cart';
import mockPopularDish from './mockData/mockPopularDish'
import ErrorPage from './pages/ErrorPage/ErrorPage';
import LoginRegister from './pages/LoginRegister/LoginRegister';

const App = () => {
  const [popularDish, setPopularDish] = useState([])
  const [comboDishes, setComboDishes] = useState([]);
  const [pizzaDishes, setPizzaDishes] = useState([]);
  const [chickenDishes, setChickenDishes] = useState([]);
  const [appetizerDishes, setAppetizerDishes] = useState([]);
  const [pastaDishes, setPastaDishes] = useState([]);
  const [saladDishes, setSaladDishes] = useState([]);
  const [drinkDishes, setDrinkDishes] = useState([]);
  const [cart, setCart] = useState(() => {
    const storedCartList = localStorage.getItem("cart")
    return storedCartList ? JSON.parse(storedCartList) : [];
  });
  useEffect(() => {
    // Gọi API Combo
    fetch('https://646dc9739c677e23218a6722.mockapi.io/api/v1/combo')
      .then(response => response.json())
      .then(data => setComboDishes(data));

    // Gọi API Pizza
    fetch('https://6469c33a03bb12ac20922ba6.mockapi.io/api/pizza/product')

      .then(response => response.json())
      .then(data => setPizzaDishes(data));

    // Gọi API Gà Giòn
    fetch('https://6475a68be607ba4797dc40d2.mockapi.io/gaGion/product')
      .then(response => response.json())
      .then(data => setChickenDishes(data));

    // Gọi API Khai vị
    fetch('https://646dc9739c677e23218a6722.mockapi.io/api/v1/khaivi')
      .then(response => response.json())
      .then(data => setAppetizerDishes(data));
    

    // Gọi API Mỳ ý
    fetch('https://6469caf903bb12ac2092bad9.mockapi.io/product-my-y')
      .then(response => response.json())
      .then(data => setPastaDishes(data));

    // Gọi API Salad
    fetch('https://645e646812e0a87ac0ef326a.mockapi.io/FoodApp/api/v1/salad')
      .then(response => response.json())
      .then(data => setSaladDishes(data));

    // Gọi API Thức uống
    fetch('https://645e646812e0a87ac0ef326a.mockapi.io/FoodApp/api/v1/drinks')
      .then(response => response.json())
      .then(data => setDrinkDishes(data));

  }, []);

  useEffect(() => {
    setPopularDish(mockPopularDish);
  }, [])

  /* Lưu cart list vào localStorage*/ 
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart])


  const onAddToCart = (productId) => {
    const allDishes = [...popularDish, ...comboDishes, ...pizzaDishes,
    ...chickenDishes, ...appetizerDishes, ...pastaDishes, ...saladDishes, ...drinkDishes];

    const findProductItem = allDishes.find((dishItem) => dishItem.id === productId);
    const indexOfAddingProductInCart = cart.findIndex(
      (cartItem) => cartItem.id === productId
    );

    if (indexOfAddingProductInCart === -1) {
      const newCartItem = {
        ...findProductItem,
        quantity: 1,
      };
      setCart([...cart, newCartItem]);
    } else {
      const clonedCart = [...cart];
      clonedCart[indexOfAddingProductInCart].quantity += 1;
      setCart(clonedCart);
    }
  }

  const onDecreaseQuantity = (productId) => {
    const cartIndexProduct = cart.findIndex((cartItem) => {
      return cartItem.id === productId;
    })

    const updatingCart = [...cart];
    const currentCartProductQuantity = updatingCart[cartIndexProduct].quantity;

    if (currentCartProductQuantity === 1) {
      onDeleteProduct();

    } else {
      updatingCart[cartIndexProduct].quantity -= 1;
      setCart(updatingCart);
    }
  }


  const onIncreaseQuantity = (productId) => {
    const cartIndexProduct = cart.findIndex((cartItem) => {
      return cartItem.id === productId;
    })

    const updatingCart = [...cart];
    updatingCart[cartIndexProduct].quantity += 1;
    setCart(updatingCart);
  }

  const onDeleteProduct = (productId) => {
    const deleteProduct = cart.filter((productItem) => productItem.id !== productId)

    setCart(deleteProduct);
  }
  return (
    <div className="App">
      <Header
        cart={cart}
        onDeleteProduct={onDeleteProduct}
        onDecreaseQuantity={onDecreaseQuantity}
        onIncreaseQuantity={onIncreaseQuantity}
        comboDishes={comboDishes}
        pizzaDishes={pizzaDishes}
        chickenDishes={chickenDishes}
        appetizerDishes={appetizerDishes}
        pastaDishes={pastaDishes}
        saladDishes={saladDishes}
        drinkDishes={drinkDishes}
      />
      <section className='page-content'>
        <Routes>
          <Route path="/" element={<Homepage
            onAddToCart={onAddToCart}
            appetizerDishes={appetizerDishes}
            pizzaDishes={pizzaDishes}
            pastaDishes={pastaDishes}
            saladDishes={saladDishes}
          />
          } />
          <Route path='/login&register' element={<LoginRegister />}/>
          <Route path="/about-us" element={<AboutUs />} />
          <Route
            path="/menu"
            element={<Menu
              comboDishes={comboDishes}
              pizzaDishes={pizzaDishes}
              chickenDishes={chickenDishes}
              appetizerDishes={appetizerDishes}
              pastaDishes={pastaDishes}
              saladDishes={saladDishes}
              drinkDishes={drinkDishes}
              onAddToCart={onAddToCart}
            />}
          />
          <Route
            path="/dish-details/:id"
            element={<ProductDetails
              popularDish={popularDish}
              comboDishes={comboDishes}
              pizzaDishes={pizzaDishes}
              chickenDishes={chickenDishes}
              appetizerDishes={appetizerDishes}
              pastaDishes={pastaDishes}
              saladDishes={saladDishes}
              drinkDishes={drinkDishes}
              onAddToCart={onAddToCart}
            />}
          />
          <Route path='/checkout' element={<Checkout cart={cart} />} />
          <Route path='/cart' element={<Cart cart={cart} onDeleteProduct={onDeleteProduct} onDecreaseQuantity={onDecreaseQuantity} onIncreaseQuantity={onIncreaseQuantity} />} />
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
      </section>
      <div className='footer-section'>

        <Footer />
      </div>
    </div>
  );
};

export default App;




