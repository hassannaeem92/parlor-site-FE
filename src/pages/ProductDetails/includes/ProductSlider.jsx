import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import image from "../../../assets/images/productImage.webp";
import "../../../styles/ProductSlider.scss";

function ProductSlider({ images, path }) {
  var productSliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    initialSlide: 0,

    responsive: [
      {
        breakpoint: 1024,
        productSliderSettings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        productSliderSettings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
          dots: false,
        },
      },
      {
        breakpoint: 480,
        productSliderSettings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };
  return (
    <Slider className={"ProductSliderInnerWrapper"} {...productSliderSettings}>
      {images ? (
        images?.length > 0 ? (
          images.map((img) => (
            <div key={img.id} className={"p-2 text-center"}>
              <img className={"img-fluid  mx-auto"} src={path + img.image} />
            </div>
          ))
        ) : (
          <div className={"p-2 text-center"}>
            <img className={"img-fluid  mx-auto"} src={image} />
          </div>
        )
      ) : null}
    </Slider>
  );
}

export default ProductSlider;
