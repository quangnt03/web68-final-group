import React from 'react'
import "./Admin.css";

const UserList = () => {

    const listUsers = [
        {
          name: "Mark",
          email: "Dom@gmai.com",
          carts: [
            {
              title: "Pizza",
              quantity: "1",
            },
            {
              title: "Salad",
              quantity: "2",
            },
            {
              title: "Pepsi",
              quantity: "1",
            },
          ],
          totalBill: "80.000",
        },
        {
          name: "Mark",
          email: "Dom@gmai.com",
          carts: [
            {
              title: "Pizza",
              quantity: "1",
            },
            {
              title: "Salad",
              quantity: "2",
            },
            {
              title: "Pepsi",
              quantity: "1",
            },
          ],
          totalBill: "80.000",
        },
        {
          name: "Mark",
          email: "Dom@gmai.com",
          carts: [
            {
              title: "Pizza",
              quantity: "1",
            },
            {
              title: "Salad",
              quantity: "2",
            },
            {
              title: "Pepsi",
              quantity: "1",
            },
          ],
          totalBill: "80.000",
        },
      ];

      
    const listUsersContainer = listUsers.map((userItem, index) => {
        const { name, email, carts, totalBill } = userItem;
        const cartList = carts.map((item) => {
          const { title, quantity } = item;
          return (
            <div className="food-orders">
              <p>{title}:</p>
              <p>{quantity}</p>
            </div>
          );
        });
        return (
          <tr style={{ verticalAlign: "middle" }}>
            <th scope="row">1</th>
            <td>{name}</td>
            <td>{email}</td>
            <td className="food-content">{cartList}</td>
            <td>{totalBill}</td>
            <th>
              <button className="btn btn-danger">x</button>
            </th>
            <th>
              <button></button>
            </th>
          </tr>
        );
      });

  return (
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
              <tbody>{listUsersContainer}</tbody>
            </table>
          </div>
        </div>
  )
}

export default UserList