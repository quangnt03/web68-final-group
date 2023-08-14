import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './LoginRegister.css'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom';

const Login = () => {
  const [cardLogin, setCardLogin] = useState(false);
  const [successLogin, setSuccessLogin] = useState(false)
  const [valueLogin, setValueLogin] = useState({
    userName: "",
    password: ""
  });

  useEffect(() => {
    window.localStorage.setItem("successLogin", JSON.stringify(successLogin));
  }, [successLogin])


  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const fromCart = searchParams.get('from') === 'cart';
  async function onFormSubmitLoginHandle(e) {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/account/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: valueLogin.userName,
        password: valueLogin.password
      }),
    })
    const data = await response.json()
    if (data.token) {
      localStorage.setItem('token', data.token)
      setSuccessLogin(true)
      alert('Đăng nhập thành công')
      if (fromCart) {
        window.location.href = '/checkout'
      } else {
        window.location.href = '/'
      }
    } else {
      alert('Kiểm tra lại thông tin đăng nhập')
    }
  }
  const onChangeValueForm = (e) => {
    const { name, value } = e.target;
    setValueLogin({
      ...valueLogin,
      [name]: value
    })
  }

  return (
    <div className='body-form'>
      <div className='title-login-resigter'>
        <a>Đăng nhập</a>
      </div>

      <div className='form-container'>
        <form onSubmit={onFormSubmitLoginHandle}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Tên đăng nhập</label>
            <input type="text" className="form-control" id='username' name='userName' value={valueLogin.userName} onChange={onChangeValueForm} />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Mật khẩu</label>
            <input type="password" className="form-control" id='password' name='password' value={valueLogin.password} onChange={onChangeValueForm} />
          </div>
          <button style={{ background: "#0b603d" }} type="submit" className="btn btn-primary btn-login-register"> Đăng nhập</button>
        </form>

      </div>

    </div>

  )
}

export default Login