import React, { useEffect } from "react";
import "./Admin.css";
import { FaChevronRight } from "react-icons/fa";
import { BsDot } from "react-icons/bs";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

import Modal from "react-bootstrap/Modal";
const Admin = ({ cart }) => {
  const [dishes, setDishes] = useState([
    {
      id: "1",
      nameDishes: "Pizza",
      image: "../images/mock-images/khaivi/khai-vi-2.png",
      price: "50000đ",
      describe:
        "Salad Gà giòn với trứng cút, thịt xông khói, phô mai parmesan và sốt Thousand Island",
      isPopular: true,
    },
    {
      id: "2",
      nameDishes: "Salad",
      image: "../images/mock-images/khaivi/khai-vi-2.png",
      price: "50000đ",
      describe:
        "Salad Gà giòn với trứng cút, thịt xông khói, phô mai parmesan và sốt Thousand Island",
      isPopular: true,
    },
    {
      id: "3",
      nameDishes: "Pizza",
      image: "../images/mock-images/khaivi/khai-vi-2.png",
      price: "50000đ",
      describe:
        "Salad Gà giòn với trứng cút, thịt xông khói, phô mai parmesan và sốt Thousand Island",
      isPopular: false,
    },
  ]);
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [imageDish, setImageDish] = useState("");
  const [priceDish, setPriceDish] = useState("");
  const [describeDish, setDescribeDish] = useState("");
  const [isPopularDish, setIsPopularDish] = useState(false);

  const [show, setShow] = useState(false);
  const [onClickUser, setOnClickUser] = useState(false);
  const [onClickProduct, setOnClickProduct] = useState(false);
  const [dishValue, setDishValue] = useState({
    id: "",
    nameDishes: "",
    describe: "",
    image: "",
    price: "",
    isPopular: false,
  });

  useEffect(() => {
    if (dishValue && dishValue.id) {
      setId(dishValue.id);
      setTitle(dishValue.nameDishes);
      setImageDish(dishValue.image);
      setPriceDish(dishValue.price);
      setDescribeDish(dishValue.describe);
      setIsPopularDish(dishValue.isPopular);
    }
  }, [dishValue]);
  console.log(title);
  const onHandlerSubmitUpdate = () => {
    const todoIndex = dishes.findIndex((itemId) => {
      return itemId.id === id;
    });
    const updateTodoList = [...dishes];
    updateTodoList[todoIndex] = {
      ...updateTodoList[todoIndex],
      nameDishes: title,
      image: imageDish,
      describe: describeDish,
      price: priceDish,
      isPopular: isPopularDish,
    };
    // updateTodoList[todoIndex].title = updateTitle;

    setDishes(updateTodoList);
  };
  const onClickBtnSidebar = (status) => {
    if (status === "user") {
      setOnClickUser(true);
      setOnClickProduct(false);
    }
    if (status === "product") {
      setOnClickUser(false);
      setOnClickProduct(true);
    }
  };
  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: {
      nameDishes: "",
      describe: "",
      image: "",
      price: "",
      isPopular: false,
    },
  });
  const { errors } = formState;

  const onFormSubmitCreateNewDish = handleSubmit((dishItem) => {
    const newRole = {
      ...dishItem,
      id: uuidv4(),
    };
    const newDishesList = [...dishes, newRole];

    setDishes(newDishesList);
    reset();
  });

  const onRemoveDishItem = (dishId) => {
    const dishesList = dishes.filter((dishItem) => {
      return dishItem.id !== dishId;
    });

    setDishes(dishesList);
  };

  console.log(dishes);
  const handleClose = () => setShow(false);

  const listDishes = dishes?.map((dishesItem, index) => {
    const { id, nameDishes, price, describe, isPopular, image } = dishesItem;
    return (
      <tr style={{ verticalAlign: "middle" }} key={id}>
        <th scope="row">{index}</th>
        <td>{nameDishes}</td>
        <td>{image}</td>
        <td>{price}</td>
        <td>{describe}</td>
        <td>{isPopular ? "Yes" : "No"}</td>

        <th>
          <button
            className="btn btn-primary"
            onClick={() => {
              setShow(true);
              setDishValue(dishesItem);
            }}
          >
            Edit
          </button>
        </th>
        <th>
          <button
            className="btn btn-danger"
            onClick={() => onRemoveDishItem(id)}
          >
            x
          </button>
        </th>
      </tr>
    );
  });
  return (
    <div className="admin-container">
      <div className="side-bar">
        <div className="btn-container">
          <button className="btn-admin">
            <img src="./images/admin/user-1.png" alt="user" />
            <p>Admin management</p>
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
        </div>
      </div>
      {onClickUser && (
        <div className="container">
          <div className="header-admin">
            <img
              src="./images/admin/user.png"
              alt="user"
              width={"24px"}
              height={"24px"}
            />
            <p style={{ color: "black", fontSize: "20px", fontWeight: "700" }}>
              User
            </p>
          </div>
          <div>
            <table className="table table-container">
              <thead class="table-primary">
                <tr>
                  <th></th>
                  <th>Họ tên</th>
                  <th>Email</th>
                  <th>Giao dịch</th>
                  <th>Tổng tiền</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ verticalAlign: "middle" }}>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Dom@gmai.com</td>
                  <td className="food-content">
                    <div className="food-orders">
                      <p>Pizza:</p>
                      <p>50.000đ</p>
                    </div>
                    <div className="food-orders">
                      <p>Salad:</p>
                      <p>20.000đ</p>
                    </div>
                    <div className="food-orders">
                      <p>Pepsi:</p>
                      <p>10.000đ</p>
                    </div>
                  </td>
                  <td>80.000đ</td>
                  <th>
                    <button className="btn btn-danger">x</button>
                  </th>
                  <th>
                    <button></button>
                  </th>
                </tr>
                <tr style={{ verticalAlign: "middle" }}>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Dom@gmai.com</td>
                  <td className="food-content">
                    <div className="food-orders">
                      <p>Pizza:</p>
                      <p>50.000đ</p>
                    </div>
                    <div className="food-orders">
                      <p>Salad:</p>
                      <p>20.000đ</p>
                    </div>
                    <div className="food-orders">
                      <p>Pepsi:</p>
                      <p>10.000đ</p>
                    </div>
                  </td>
                  <td>80.000đ</td>
                  <th>
                    <button className="btn btn-danger">x</button>
                  </th>
                  <th>
                    <button></button>
                  </th>
                </tr>
                <tr style={{ verticalAlign: "middle" }}>
                  <th scope="row">3</th>
                  <td>Larry the Bird</td>
                  <td>Dom@gmai.com</td>
                  <td className="food-content">
                    <div className="food-orders">
                      <p>Pizza:</p>
                      <p>50.000đ</p>
                    </div>
                    <div className="food-orders">
                      <p>Salad:</p>
                      <p>20.000đ</p>
                    </div>
                    <div className="food-orders">
                      <p>Pepsi:</p>
                      <p>10.000đ</p>
                    </div>
                  </td>
                  <td>80.000đ</td>
                  <th>
                    <button className="btn btn-danger">x</button>
                  </th>
                  <th>
                    <button></button>
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
      {onClickProduct && (
        <div className="container">
          <div className="header-admin">
            <img
              src="./images/admin/privacy.png"
              alt="user"
              width={"24px"}
              height={"24px"}
            />
            <p style={{ color: "black", fontSize: "20px", fontWeight: "600" }}>
              Products & Updation
            </p>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingBottom: "48px",
            }}
          >
            <div style={{ fontSize: "20px", fontWeight: "400" }}>Products</div>
            <button
              className="btn-create"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Create Product
            </button>
          </div>
          <div
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
            style={{ margin: "16px" }}
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="title-modal">
                  <h3>Create Product</h3>
                </div>

                <div className="modal-form">
                  <form onSubmit={onFormSubmitCreateNewDish}>
                    <div className="mb-3">
                      <label for="exampleInputEmail1" className="form-label">
                        Tên món ăn
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        placeholder="Des of role"
                        {...register("nameDishes", {
                          required: {
                            value: true,
                            message: "Please enter a dish.",
                          },
                        })}
                      />
                    </div>
                    <div className="mb-3">
                      <label for="exampleInputImage" className="form-label">
                        Ảnh món ăn
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="exampleInputImage"
                        placeholder="Des of role"
                        {...register("image", {
                          required: {
                            value: true,
                            message: "Please enter a image.",
                          },
                        })}
                      />
                    </div>
                    <div className="mb-3">
                      <label for="exampleInputPrice" className="form-label">
                        Giá tiền
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="exampleInputPrice"
                        placeholder="Des of role"
                        {...register("price", {
                          required: {
                            value: true,
                            message: "Please enter a price.",
                          },
                        })}
                      />
                    </div>
                    <div className="mb-3">
                      <label for="exampleInputDescribe" className="form-label">
                        Mô tả
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="exampleInputDescribe"
                        placeholder="Des of role"
                        {...register("describe", {
                          required: {
                            value: true,
                            message: "Please enter a describe.",
                          },
                        })}
                      />
                    </div>
                    <div className="mb-3">
                      <label for="exampleInputPopular" className="form-label">
                        Phổ biến
                      </label>
                      <input
                        type="checkbox"
                        id="exampleInputPopular"
                        {...register("isPopular")}
                      />
                    </div>
                    <div
                      style={{
                        marginLeft: "280px",
                        display: "flex",
                        gap: "15px",
                      }}
                    >
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      <button type="submit" className="btn btn-primary">
                        Create
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Upgrate Dish</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={onHandlerSubmitUpdate}>
                <div className="mb-3">
                  <label for="exampleInputEmail1" className="form-label">
                    Tên món ăn
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Des of role"
                    name="nameDishes"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label for="exampleInputImage" className="form-label">
                    Ảnh món ăn
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleInputImage"
                    placeholder="Des of role"
                    name="image"
                    onChange={(e) => setImageDish(e.target.value)}
                    value={imageDish}
                  />
                </div>
                <div className="mb-3">
                  <label for="exampleInputPrice" className="form-label">
                    Giá tiền
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleInputPrice"
                    placeholder="Des of role"
                    name="price"
                    onChange={(e) => setPriceDish(e.target.value)}
                    value={priceDish}
                  />
                </div>
                <div className="mb-3">
                  <label for="exampleInputDescribe" className="form-label">
                    Mô tả
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleInputDescribe"
                    placeholder="Des of role"
                    value={describeDish}
                    name="describe"
                    onChange={(e) => setDescribeDish(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label for="exampleInputPopular" className="form-label">
                    Phổ biến
                  </label>
                  <input
                    type="checkbox"
                    id="exampleInputPopular"
                    name="isPopular"
                    value={isPopularDish}
                    onChange={(e) => setIsPopularDish(e.target.value)}
                  />
                </div>
                <div
                  style={{
                    marginLeft: "280px",
                    display: "flex",
                    gap: "15px",
                  }}
                >
                  <button
                    type="button"
                    class="btn btn-secondary"
                    onClick={handleClose}
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Update
                  </button>
                </div>
              </form>
            </Modal.Body>
          </Modal>
          <div>
            <table className="table table-container">
              <thead class="table-primary">
                <tr>
                  <th></th>
                  <th>Tên món ăn</th>
                  <th width={"250px"}>Ảnh món ăn</th>
                  <th>Giá tiền</th>
                  <th width={"350px"}>Mô tả</th>
                  <th>Phổ biến</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>{listDishes}</tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
