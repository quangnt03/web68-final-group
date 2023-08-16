import React, { useState, useEffect } from 'react';
import { useForm, clearErrors } from "react-hook-form";


const AccountInfo = (props) => {
  const { userData, setUserData } = props
  const [password, setPassword] = useState('');
  const { register, handleSubmit, formState, setValue, getValues, reset } = useForm();
  const { errors } = formState;
  const [errorMessage, setErrorMessage] = useState('');
  const [showPasswordChangeForm, setShowPasswordChangeForm] = useState(false);
  const [accountInfoUpdate, setAccountInfoUpdate] = useState(false)


  //Mở form thông tin tài khoản
  const toggleAccountInfoUpdate = () => {
    setAccountInfoUpdate(!accountInfoUpdate);
  };
  //Mở form thay đổi mật khẩu
  const togglePasswordChangeForm = () => {
    setShowPasswordChangeForm(!showPasswordChangeForm);
  };

  //Nếu ko ở trạng thái edit thì set lại thông tin tài khoản như lúc đầu
  useEffect(() => {
    if (!accountInfoUpdate) {
      setValue('username', userData.username);
      setValue('email', userData.email);
    }
  }, [accountInfoUpdate, userData]);


  //Submit form thông tin tài khoản
  const handleFormSubmit = async (data) => {
    const password = data.password
    const token = localStorage.getItem('token');
    // Kiểm tra password
    const response = await fetch('/check-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ password }),
    });
    //Nếu pw hợp lệ, gửi thông tin update lên server
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
      //Nếu update thông tin thành công
      if (updateResponse.ok) {
        console.log('User data updated successfully');
        alert("Cập nhật tài khoản thành công.");
        setAccountInfoUpdate(false)
        setUserData({
          userData,
          updateData
        })
      }
      //Xử lý lỗi
      else {
        const errorResponse = await updateResponse.json();
        if (errorResponse.error === 'Duplicate username') {

          setErrorMessage('Tên đăng nhập đã tồn tại')
        } else if (errorResponse.error === 'Duplicate email') {
          setErrorMessage('Email đã tồn tại');
        }
        else {
          setErrorMessage('Đã xảy ra lỗi. Vui lòng thử lại');
        }
      }
    } else {

      setErrorMessage('Mật khẩu không chính xác');
    }
  };

  //Submit form đổi mật khẩu
  const passwordChangFormSubmit = async (data) => {
    const password = data.oldPassword;
    const token = localStorage.getItem('token');

    //Kiểm tra pw cũ
    const response = await fetch('/check-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ password }),
    });
    //Gửi pw mới lên server
    if (response.ok) {
      console.log('password hợp lệ');
      const responseData = await response.json();
      const updatedPassword = data.newPassword;
      const updateData = {
        user: responseData.user,
        password: updatedPassword,
      };
      const updateResponse = await fetch('http://localhost:5000/change-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });
      //Đăng nhập lại nếu đổi pw thành công
      if (updateResponse.ok) {
        console.log('Password updated successfully');
        alert("Thay đổi mật khẩu thành công. Vui lòng đăng nhập lại.");
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
        //Xử lý lỗi
      } else {
        const errorResponse = await updateResponse.json();
        setErrorMessage('Đã xảy ra lỗi. Vui lòng thử lại');
      }
    } else {
      setErrorMessage('Mật khẩu không chính xác')
      return;
    }
  };

  return (
    <div className="container account-info-container mt-5">
      <div className="row justify-content-center">
        <div className="">
          <div className="card">
            <div className="card-header">
              <h2 className="mb-0">Thông tin tài khoản</h2>
            </div>
            <div className="card-body">
              {/* Form thông tin người dùng */}
              {!showPasswordChangeForm ? (
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                  <div className="form-group">
                    <label htmlFor="username">Tên đăng nhập</label>
                    <input
                      type="text"
                      defaultValue={userData.username}
                      className="form-control"
                      id="username"
                      name="username"
                      readOnly={!accountInfoUpdate}
                      onFocus={() => setErrorMessage('')}
                      {...register("username", {
                        required: {
                          value: true,
                          message: "Vui lòng nhập tên đăng nhập"
                        }
                      })}
                    />
                    {accountInfoUpdate && <p className='text-danger'>{errors.username?.message}</p>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      defaultValue={userData.email}
                      className="form-control"
                      id="email"
                      name="email"
                      readOnly={!accountInfoUpdate}
                      onFocus={() => setErrorMessage('')}
                      {...register("email", {
                        required: {
                          value: true,
                          message: "Vui lòng nhập email"
                        }
                      })}
                    />
                    {accountInfoUpdate && (< p className='text-danger'>{errors.email?.message}</p>)}
                  </div>
                  {accountInfoUpdate && (
                    <div className="form-group">
                      <label htmlFor="password">Xác nhận mật khẩu</label>
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
                      {accountInfoUpdate && (< p className='text-danger'>{errors.password?.message}</p>)}
                    </div>
                  )}
                  {accountInfoUpdate && errorMessage && <p className="text-danger">{errorMessage}</p>}
                  <div className="form-group">
                    {accountInfoUpdate && (
                      <button
                        type="submit"
                        className="btn btn-success mb-3 ml-2"
                      >
                        Cập nhật
                      </button>
                    )}
                  </div>
                  <a
                    className='text-success form-group' role='button'
                    onClick={() => {
                      toggleAccountInfoUpdate()
                      setErrorMessage("")
                      reset({
                        username: userData.username,
                        email: userData.email,
                        password: ""
                      });
                    }}>
                    {accountInfoUpdate ? 'Hủy bỏ' : 'Thay đổi thông tin tài khoản'}
                  </a>
                  {!accountInfoUpdate && (<a className="edit-toggle text-success" role='button' onClick={togglePasswordChangeForm}>
                    Thay đổi mật khẩu
                  </a>)}

                  {/* Form thay đổi mật khẩu */}
                </form>
              ) : (<form onSubmit={handleSubmit(passwordChangFormSubmit)}>
                <div className="form-group">
                  <div className="form-group">
                    <label htmlFor="confirmPassword">Mật khẩu cũ</label>
                    <input
                      type="password"
                      className="form-control"
                      id="oldPassword"
                      name="oldPassword"
                      onFocus={() => setErrorMessage('')}
                      {...register("oldPassword", {
                        required: {
                          value: true,
                          message: "Vui lòng nhập mật khẩu"
                        }
                      })}
                    />
                    {errors.oldPassword && (< p className='text-danger'>{errors.oldPassword?.message}</p>)}
                  </div>
                  <label htmlFor="oldPassword">Mật khẩu mới</label>
                  <input
                    type="password"
                    className="form-control"
                    id="newwPassword"
                    name="newPassword"
                    {...register("newPassword", {
                      required: {
                        value: true,
                        message: "Vui lòng nhập mật khẩu mới"
                      },
                      pattern: {
                        value: /^(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?])\S+$/,
                        message: "Mật khẩu có ít nhất 5 kí tự bao gồm có một kí tự đặc biệt"
                      },
                      minLength: {
                        value: 5,
                        message: "Mật khẩu có ít nhất 5 kí tự"
                      }
                    })}
                  />
                  {errors.newPassword && (< p className='text-danger'>{errors.newPassword?.message}</p>)}
                </div>
                <div className="form-group">
                  <label htmlFor="newPassword">Xác nhận mật khẩu mới</label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    name="confirmPassword"
                    {...register("confirmPassword", {
                      required: "Vui lòng xác nhận mật khẩu mới",
                      validate: (value) =>
                        value === getValues("newPassword") || "Mật khẩu không khớp"
                    })}
                  />
                  {errors.confirmPassword && (< p className='text-danger'>{errors.confirmPassword?.message}</p>)}
                </div>
                {showPasswordChangeForm && errorMessage && <p className="text-danger">{errorMessage}</p>}
                <div className="form-group">
                  <button type="submit" className="btn btn-success">
                    Cập nhật
                  </button>
                </div>
                <a
                  className='text-success form-group' role='button'
                  onClick={() => {
                    togglePasswordChangeForm()
                    setErrorMessage("")
                    reset({
                      oldPassword: "",
                      newPassword: "",
                      confirmPassword: "",
                      username: userData.username,
                      email: userData.email
                    });
                  }}>
                  Hủy bỏ
                </a>

              </form>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

};

export default AccountInfo;
