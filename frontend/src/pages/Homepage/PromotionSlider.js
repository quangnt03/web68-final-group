import React from 'react'

const PromotionSlider = () => {
  return (
    <div className='promotion-slider m-auto'>
      <div id="carouselExampleIndicators" className="carousel slide  " data-bs-ride="carousel">
        <ol className="carousel-indicators">
          <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to={0} className="active" />
          <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to={1} />
          <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to={2} />
          <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to={3} />
          <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to={4} />
        </ol>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img className="d-block h-100 w-100" src="images\homepage\promotion-slide-1.jpeg" alt="First slide" />
          </div>
          <div className="carousel-item">
            <img className="d-block h-100 w-100" src="images\homepage\promotion-slide-2.jpeg" alt="Second slide" />
          </div>
          <div className="carousel-item">
            <img className="d-block h-100 w-100" src="images\homepage\promotion-slide-3.jpeg" alt="Third slide" />
          </div>
          <div className="carousel-item">
            <img className="d-block h-100 w-100" src="images\homepage\promotion-slide-4.jpeg" alt="Forth slide" />
          </div>
          <div className="carousel-item">
            <img className="d-block h-100 w-100" src="images\homepage\promotion-slide-5.jpeg" alt="Fifth slide" />
          </div>
        </div>
        <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="sr-only">Next</span>
        </a>
      </div>
    </div>
  )
}

export default PromotionSlider