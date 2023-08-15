import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './LoginRegister.css'
import { useForm } from 'react-hook-form'

const Register = () => {
  const [cardRegister, setCardRegister] = useState(true);
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const [errorMessage, setErrorMessage] = useState('');
  const [dataRegister, setDataRegister] = useState({
    username: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  async function onSubmit(data) {
    console.log('Form data submitted:', data);
    const response = await fetch('http://localhost:5000/account/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: data.username,
        email: data.email,
        password: data.password
      }),
    })
    const res = await response.json()

    if (res.status === 'ok') {
      const alertMessage = 'Đăng ký tài khoản thành công. Chuyển qua trang đăng nhập';
      window.alert(alertMessage);
      window.location.href = '/account/login'
    }
    else if (res.error === 'Duplicate username') {
      setErrorMessage('Tên người dùng đã tồn tại')
    }
    else if (res.error === 'Duplicate email') {
      setErrorMessage('Email đăng ký đã tồn tại')
    }
  };

  return (
    <div className='body-form'>
      <div className='title-login-resigter'>
        <a>Tạo tài khoản</a>
      </div>

      <div className='form-container'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Tên đăng nhập</label>
            <input type="text" className="form-control"
              name="username"
              {...register("username", {
                required: {
                  value: true,
                  message: "Vui lòng nhập tên đăng nhập"
                }
              })} />
            <p className='text-danger'>{errors.username?.message}</p>

          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">E-mail </label>
            <input type="email" className="form-control"
              name="email"
              {...register("email", {
                required: {
                  value: true,
                  message: "Vui lòng nhập email"
                },
                pattern: {
                  value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: "Nhập e-mail không đúng"
                },

              })} />
            <p className='text-danger'>{errors.email?.message}</p>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Mật khẩu</label>
            <input type="password" className="form-control"
              name="password"
              {...register("password", {
                required: {
                  value: true,
                  message: "Vui lòng nhập mật khẩu"
                },
                pattern: {
                  value: /^(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?])\S+$/,
                  message: "Mật khẩu có ít nhất 5 kí tự bao gồm có một kí tự đặc biệt"
                },
                minLength: {
                  value: 5,
                  message: "Mật khẩu có ít nhất 5 kí tự"
                }
              })} />
            <p className='text-danger'>{errors.password?.message}</p>
          </div>
          {errorMessage && <p className="text-danger">{errorMessage}</p>}
          <button style={{ background: "#0b603d" }} type="submit" className="btn btn-primary btn-login-register">Đăng ký</button>
        </form>
      </div>

    </div>
  )
}

export default Register