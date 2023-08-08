import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './LoginRegister.css'
import { useForm } from 'react-hook-form'
const LoginRegister = () => {
  const [cardLogin, setCardLogin] = useState(false);
  const [cardRegister, setCardRegister] = useState(true);
  const [successLogin, setSuccessLogin] = useState(false)
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const [valueLogin, setValueLogin] = useState({
    userName: "",
    password: ""
  });
  // const [login, setLogin] = useState({})
  // const [dataRegister, setDataRegister] = useState(() => {
  //   const registerStorage = JSON.parse( localStorage.getItem("valueRegister"));
  //   return registerStorage
  // })
  useEffect(() => {
    window.localStorage.setItem("successLogin", JSON.stringify(successLogin));
  }, [successLogin])

  const [dataRegister, setDataRegister] = useState({})

  useEffect(() => {
    window.localStorage.setItem("valueRegister", JSON.stringify(dataRegister));
  }, [dataRegister])



  const navigate = useNavigate();

  const onNavigateToCheckoutPage = () => {
    const to = `/checkout`;
    navigate(to);
  };

  useEffect(() => {
    if (valueLogin.userName !== dataRegister.username || valueLogin.password !== dataRegister.password) {
      setSuccessLogin(false)
    }else{
      setSuccessLogin(true)
    }
  },[valueLogin, dataRegister])
  const onFormSubmitLoginHandle = (e) => {
    e.preventDefault();
    onCheckPassword()
  }
  const onChangeValueForm = (e) => {
    const { name, value } = e.target;
    setValueLogin({
      ...valueLogin,
      [name]: value
    })
  }

  const onFormSubmitRegisterHandle = (dataRegister) => {
    console.log("dataLogin", dataRegister)
    setDataRegister(dataRegister)
    alert("Đăng ký thành công")
  }

  const onCheckPassword = () => {
    if (valueLogin.userName !== dataRegister.username || valueLogin.password !== dataRegister.password) {
      setSuccessLogin(false)
      alert("Đăng nhập không đúng. Xin vui lòng nhập lại")

    } else {
      setSuccessLogin(true)
      alert("Đăng nhập thành công")
      onNavigateToCheckoutPage()
    }
  }

  console.log("successLogin", successLogin)

  // console.log("successLogin", successLogin)
  const onClickCardLogin = () => {
    setCardLogin(true)
    setCardRegister(false)
  }

  const onClickCardRegister = () => {
    setCardLogin(false)
    setCardRegister(true)
  }

  const styleCardLogin = cardLogin ? "active  " : ""
  const styleCardRegister = cardRegister ? "active " : ""
  const styleFormLogin = cardLogin ? "active-login" : "form-login";
  const styleFormRegister = cardRegister ? "active-register" : "form-register"
  return (
    <div className='body-form'>
      <div className='title-login-resigter'>
        <a onClick={onClickCardLogin} className={styleCardLogin}>Đăng nhập</a>
        <a onClick={onClickCardRegister} className={styleCardRegister}>Tạo tài khoản</a>

      </div>
      <div className='form-container'>
        <form onSubmit={onFormSubmitLoginHandle} className={styleFormLogin}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Họ và tên</label>
            <input type="text" className="form-control" id='username' name='userName' value={valueLogin.userName} onChange={onChangeValueForm} />
            {/* <p className='text-danger'>{errors.username?.message}</p> */}
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Mật khẩu</label>
            <input type="password" className="form-control" id='password' name='password' value={valueLogin.password} onChange={onChangeValueForm} />
            {/* <p className='text-danger'>{errors.password?.message}</p> */}
          </div>
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
            <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
          </div>
          <button style={{ background: "#0b603d" }} type="submit" className="btn btn-primary btn-login-register"> Đăng nhập</button>
        </form>

        <form onSubmit={handleSubmit(onFormSubmitRegisterHandle)} className={styleFormRegister}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Họ và tên</label>
            <input type="text" className="form-control" {...register("username", {
              required: {
                value: true,
                message: "Vui lòng nhập họ và tên"
              }

            })} />
            <p className='text-danger'>{errors.username?.message}</p>
          </div>
          <div className="mb-3">
            <label htmlFor="numberPhone" className="form-label">Số điện thoại</label>
            <input type="phone" className="form-control" {...register("numberPhone", {
              required: {
                value: true,
                message: "Vui lòng nhập số điện thoại"
              }
            })} />
            <p className='text-danger'>{errors.numberPhone?.message}</p>
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">E-mail </label>
            <input type="email" className="form-control" {...register("email", {
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
            <input type="password" className="form-control" {...register("password", {
              required: {
                value: true,
                message: "Vui lòng nhập mật khẩu"
              },
              pattern: {
                value: /^(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?])\S+$/,
                message: "Mật khẩu có ít nhất 8 kí tự bao gồm có một kí tự đặc biệt"
              },
              minLength: {
                value: 8,
                message: "Mật khẩu có ít nhất 8 kí tự"
              }
            })} />
            <p className='text-danger'>{errors.password?.message}</p>
          </div>
          {/* <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
        </div> */}
          <button style={{ background: "#0b603d" }} type="submit" className="btn btn-primary btn-login-register">Đăng kí</button>
        </form>
      </div>

    </div>

  )
}

export default LoginRegister