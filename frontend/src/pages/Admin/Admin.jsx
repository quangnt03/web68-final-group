import React, { useEffect } from "react";
import "./Admin.css";
import { FaChevronRight } from "react-icons/fa";
import { BsDot } from "react-icons/bs";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import UserList from "./UserList";
import FoodList from "./FoodList";
import AccountInfo from "./AccountInfo";
import Modal from "react-bootstrap/Modal";

const Admin = ({ cart }) => {
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [imageDish, setImageDish] = useState("");
  const [priceDish, setPriceDish] = useState("");
  const [describeDish, setDescribeDish] = useState("");
  const [isPopularDish, setIsPopularDish] = useState(false);
  const [show, setShow] = useState(false);
  const [onClickUser, setOnClickUser] = useState(true);
  const [onClickProduct, setOnClickProduct] = useState(false);
  const [onClickAccount, setOnClickAccount] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({ username: '', email: '' })
  
  let currentUser
  
  const onClickBtnSidebar = (status) => {
    if (status === "user") {
      setOnClickUser(true);
      setOnClickProduct(false);
      setOnClickAccount(false)
    }
    if (status === "product") {
      setOnClickUser(false);
      setOnClickProduct(true);
      setOnClickAccount(false)
    }
    if (status === "account") {
      setOnClickUser(false);
      setOnClickProduct(false);
      setOnClickAccount(true)
    }
  };
  const [dishes, setDishes] = useState([])
//Fetch data
useEffect(() => {
  // Fetch data món ăn
  fetch('/data/foods')
    .then(response => response.json())
    .then(data => {
      setDishes(data)
      console.log('Food list', data)
    })
    .catch(error => {
      console.error('Error:', error);
    });
}, []);
    //Fetch data người dùng hiện tại
    // useEffect(() => {
    //   fetch('/account', {
    //           method: 'GET',
    //           headers: {
    //             Authorization: `Bearer ${localStorage.getItem('token')}`,
    //           },
    //         })
    //     .then(response => response.json())
    //     .then(data => {
    //       currentUser = data
    //       setUserData(data)
    //       setLoading(false);
          
    //     })
    //     .catch(error => {
    //       console.error('Error:', error);
    //     });
    // }, []);
    // let currentUser
    // const fetchUserData = async () => {
    //   try {
    //     const response = await fetch('/account', {
    //       method: 'GET',
    //       headers: {
    //         Authorization: `Bearer ${localStorage.getItem('token')}`,
    //       },
    //     });
  
    //     if (response.ok) {
    //       const data = await response.json();
    //       setUserData({ username: data.username, email: data.email });
    //     } else {
          
    //       console.error('Error fetching user data:', response.statusText);
    //     }
    //   } catch (error) {
    //     console.error('Error fetching user data:', error);
    //   }
    // };
    // useEffect(() => {
    //   fetchUserData()
    //   console.log(userData)}, [])
    
    useEffect(() => {
      const fetchUserData = async () => {
        try {
          const response = await fetch('/account', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
    
          if (response.ok) {
            const data = await response.json();
            setUserData({ username: data.username, email: data.email });
          } else {
            console.error('Error fetching user data:', response.statusText);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
    
      fetchUserData();
    }, []); 
  
  return (
    <div className="admin-container">
      <div className="side-bar" id = "sidebar">
        <div className="btn-container">
          <button className="btn-admin">
            <img src="./images/admin/user-1.png" alt="user" />
            <p>Admin</p>
            <FaChevronRight className="icon-chev" />
          </button>
          <button
            className={onClickUser ? "btn-user active" : "btn-user"}
            onClick={() => onClickBtnSidebar("user")}
          >
            <BsDot />
            <p>Users</p>
            <FaChevronRight className="icon-chev" />
          </button>
          <button
            className={onClickProduct ? "btn-user active" : "btn-user"}
            onClick={() => onClickBtnSidebar("product")}
          >
            <BsDot />
            <p>Products</p>
            <FaChevronRight className="icon-chev" />
          </button>
          <button
            className={onClickAccount ? "btn-user active" : "btn-user"}
            onClick={() => onClickBtnSidebar("account")}
          >
            <BsDot />
            <p>Tài khoản</p>
            <FaChevronRight className="icon-chev" />
          </button>
        </div>
      </div>
      <div className="tab-content">
      {onClickUser && <UserList 
      />}
      {onClickProduct && <FoodList 
      dishes = {dishes}
      setDishes = {setDishes}/>}
      { onClickAccount && <AccountInfo
      userData = {userData}
      setUserData = {setUserData}/>}
      </div>
    </div>
  );
};

export default Admin;
