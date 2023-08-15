import React, { useState, useEffect} from 'react';
import { useForm } from "react-hook-form";
import "./Admin.css";

const AccountInfo = (props) => {
//   const [userData, setUserData] = useState({ username: '', email: '' });
 const {userData, setUserData} = props
  const [editMode, setEditMode] = useState(false);
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [password, setPassword] = useState('');
  const { register, handleSubmit, formState, setValue } = useForm();
  const { errors } = formState;
  const [errorMessage, setErrorMessage] = useState('');
  const [showPasswordChangeForm, setShowPasswordChangeForm] = useState(false);
//   const [userData, setUserData] = useState({ username: '', email: '' })
  

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await fetch('/account', {
//           method: 'GET',
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//           },
//         });
  
//         if (response.ok) {
//           const data = await response.json();
//           setUserData({ username: data.username, email: data.email });
//         } else {
//           console.error('Error fetching user data:', response.statusText);
//         }
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//       }
//     };
  
//     fetchUserData();
//   }, []); // Empty dependency array ensures this effect runs only once on mount
  


  const toggleEditMode = () => {
    setEditMode(!editMode);
    setShowPasswordInput(false);
  };
//   if (editMode === false) {
//     setValue('username', userData.username);
//     setValue('email', userData.email);
// }
const togglePasswordChangeForm = () => {
    setShowPasswordChangeForm(!showPasswordChangeForm);
  };


useEffect(() => {
    if (!editMode) {
      setValue('username', userData.username);
      setValue('email', userData.email);
    }
  }, [editMode, userData]);
  
  
  const togglePasswordInput = () => {
    setShowPasswordInput(!showPasswordInput);
  };
  



  const handleFormSubmit = async (data) => {
    console.log(data)
    const password = data.password
    console.log(password)
    const token = localStorage.getItem('token');
    // Check password with your backend
    const response = await fetch('/check-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ password }),
    });
  
    if (response.ok) {
        console.log('password hợp lệ')
      const responseData = await response.json();
      const updatedUserData = data;
      const updateData = {
        user: responseData.user,
        updatedData: data,
      };
      const updateResponse = await fetch('/update-user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });
  
      if (updateResponse.ok) {
        console.log('User data updated successfully');
        alert("Cập nhật tài khoản thành công. Vui lòng đăng nhập lại.");
        try {
          const response = await fetch('http://localhost:5000/account/logout', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
          });
  
          if (response.ok) {
            localStorage.removeItem('token');
            localStorage.setItem('successLogin', false);
            window.location.href = '/account/login';
          } else {
            console.error('Logout failed.');
          }
        } catch (error) {
          console.error('Error during logout:', error);
        }
      } 
      else {
        const errorResponse = await updateResponse.json();
    if (errorResponse.error === 'Duplicate username') {
    //   alert('Tên đăng nhập đã tồn tại');
    setErrorMessage('Tên đăng nhập đã tồn tại')
    } else if (errorResponse.error === 'Duplicate email'){
        setErrorMessage('Email đã tồn tại');
    }
        else {
            setErrorMessage('Đã xảy ra lỗi. Vui lòng thử lại');
        }
    }
    } else {
      // Incorrect password, show alert
      setErrorMessage('Mật khẩu không chính xác');
    }
  };
  
  
  
//   const handleChange = (e, name) => {
//     if (editMode) {
//       setUserData({ ...userData, [name]: e.target.value });
//     }
//   };

  return (
    <div className="container w-100 mt-5">
      <div className="row justify-content-center">
        <div className="">
          <div className="card">
            <div className="card-header">
              <h2 className="mb-0">Account information</h2>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit(handleFormSubmit)}>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    defaultValue = {userData.username}
                    className="form-control"
                    id="username"
                    name="username"
                    readOnly={!editMode}
                    onFocus={() => setErrorMessage('')}
                    {...register("username", {
                        required: {
                          value: true,
                          message: "Vui lòng nhập tên đăng nhập"
                        }
                      })}
                  />
                  <p className='text-danger'>{errors.username?.message}</p>
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    defaultValue = {userData.email}
                    className="form-control"
                    id="email"
                    name="email"
                    readOnly={!editMode}
                    onFocus={() => setErrorMessage('')}
                    // onChange={(e) => handleChange(e, 'email')}
                    {...register("email", {
                        required: {
                          value: true,
                          message: "Vui lòng nhập email"
                        }
                      })}
                  />
                  {editMode && (< p className='text-danger'>{errors.email?.message}</p>)}
                </div>
                {editMode && (
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      onFocus={() => setErrorMessage('')}
                      {...register("password", {
                        required: {
                          value: true,
                          message: "Vui lòng nhập mật khẩu"
                        }
                      })}
                    />
                    {editMode && (< p className='text-danger'>{errors.password?.message}</p>)}
                  </div>
                )}
                {editMode && errorMessage && <p className="text-danger">{errorMessage}</p>}
                <div className="form-group">
                {editMode && (
                  <button
                    type="submit"
                    className="btn btn-success mb-3 ml-2"
                    // onClick={togglePasswordInput}
                  >
                    Cập nhật
                  </button>
                )}
                </div>
                <a
                className='text-success form-group'
                  onClick={toggleEditMode}>
                  {editMode ? 'Cancel': 'Thay đổi thông tin tài khoản' }
                </a>
                
                {/* {editMode  && (
                  <button type="submit" className="btn btn-success mb-3 ml-2">
                    Save Changes
                  </button>
                )} */}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default AccountInfo;
