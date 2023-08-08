import React from 'react'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <div className='m-5 d-flex justify-content-center align-items-center'>
      <h4>Trang này không tồn tại, vui lòng quay lại <Link to="/">trang chủ</Link></h4>
    </div>
  )
}

export default ErrorPage