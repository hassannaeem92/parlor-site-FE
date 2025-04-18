import React from 'react';
import image from '../../../assets/images/shopImage.webp';
import '../../../styles/shopCard.scss';
import { SlLocationPin } from "react-icons/sl";
import {useNavigate} from "react-router-dom";

function ShopCard({ shop }) {
    const navigate=useNavigate();
    return (
        <div onClick={()=>navigate('/shop-details')} className={"col-lg-4 mb-3"}>
            <div className={"d-flex align-items-start gap-3 shopCard"}>
                <div className={"image"}>
                    <img src={image} alt={shop.title} />
                </div>
                <div>
                    <div className={"title h5 mb-0"}>{shop.title}</div>
                    <div className={"location d-flex align-items-start gap-2 mt-1"}>
                        <div className={"icon"}>
                            <SlLocationPin/>
                        </div>

                        <div className={"mt-1"}>{shop.location}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShopCard;
