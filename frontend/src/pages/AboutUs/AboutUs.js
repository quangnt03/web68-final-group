import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Delivery from '../Homepage/Delivery';
import './AboutUsResponsive.css'
import "./AboutUs.css"
import { useLayoutEffect } from 'react';

const AboutUs = () => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0); // Scrolls the page to the top
  }, []);
  return (
    <div className='about-us'>
      <img className='about-us-header img-fluid' src="images\about-us\about-us-title-1.png"
      />
      <div className="about-us-container">
        <div className='about-us-text'>
          <h2 ><span
            style={{ color: "var(--primary-color-1)" }}>"Điều kỳ diệu của Pizza”</span> là
            nguồn gốc của nhà hàng chúng tôi</h2>
          <i>
            <p>
              Với phương châm "Delivering Wow, Sharing Happiness", chúng tôi hướng tới mục tiêu mang đến những trải nghiệm tuyệt vời cho tất cả các khách hàng thân thiết của mình. Đối với chúng tôi, nhà hàng không chỉ là nơi để ăn uống. Chúng tôi thực sự mong muốn mỗi khách hàng khi đến với nhà hàng đều trở về với tâm trạng hạnh phúc bởi vì thức ăn, cung cách phục vụ và không khí ở nhà hàng, những thứ góp phần đem lại trải nghiệm "Wow" cho khách hàng.
            </p>
            <p>
              Sứ mệnh của chúng tôi là chúng tôi đứng vững và làm việc hàng ngày để đạt được tầm nhìn này "Mang lại WOW, Chia sẻ hạnh phúc".
            </p>
            <p>
              Chúng tôi sẽ tiếp tục trưởng thành và cải thiện mỗi ngày để có thể thực hiện được phương châm "Delivering Wow, Sharing Happiness" của chúng tôi.
            </p>
          </i>
        </div>
        <div className='about-us-img'>
          <img src="images\about-us\about-us-1.jpg" />

        </div>
      </div>
    </div>
  );
};

export default AboutUs;
