import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './LoginRegister.css'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom';

const Login = () => {
  const [successLogin, setSuccessLogin] = useState(false)
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    window.localStorage.setItem("successLogin", JSON.stringify(successLogin));
  }, [successLogin])

  //Kiểm tra xem có phải log in từ trang giỏ hàng ko
  const [searchParams] = useSearchParams();
  const fromCart = searchParams.get('from') === 'cart';


  async function onFormSubmitLoginHandle(data) {
    const response = await fetch('http://localhost:5000/account/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: data.username,
        password: data.password
      }),
    })
    const receivedData = await response.json()
    console.log("token", receivedData.token)
    if (receivedData.token) {
      localStorage.setItem('token', receivedData.token)
      setSuccessLogin(true)
      alert('Đăng nhập thành công')
      if (fromCart) {
        window.location.href = '/checkout'
      } else {
        window.location.href = '/'
      }
    } else {
      setErrorMessage("Kiểm tra lại thông tin đăng nhập")
    }
  }


  return (
    <div className='body-form'>
      <div className='title-login-resigter'>
        <a>Đăng nhập</a>
      </div>

      <div className='form-container'>
        <form onSubmit={handleSubmit(onFormSubmitLoginHandle)}  >
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Tên đăng nhập</label>
            <input type="text" className="form-control" id='username' name='userName'
              {...register("username", {
                required: {
                  value: true,
                  message: "Vui lòng nhập tên đăng nhập"
                }
              })} >
            </input>
            {errors.username && <p className='text-danger'>{errors.username?.message}</p>}
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Mật khẩu</label>
            <input type="password" className="form-control" id='password' name='password'

              {...register("password", {
                required: {
                  value: true,
                  message: "Vui lòng nhập mật khẩu"
                }
              })} />
            {errors.password && <p className='text-danger'>{errors.password?.message}</p>}
          </div>
          {errorMessage && <p className="text-danger">{errorMessage}</p>}
          <button style={{ background: "#0b603d" }} type="submit" className="btn btn-primary btn-login-register"> Đăng nhập</button>
        </form>

      </div>

    </div>

  )
}

export default Login