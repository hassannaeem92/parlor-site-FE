import React from 'react';
import ShopCard from "./includes/ShopCard.jsx";
import {shopData} from "./includes/data.jsx";

export default function Shops() {
    return (
        <div className={"Shop"}>
            <div className={"container px-0 pb-5 pt-3"}>
                <div className={"row mx-0"}>
                    <div className={"col-lg-12"}>
                        <div className={"heading h2 mb-0 py-4"}>All Shops</div>
                    </div>
                </div>
                <div className={"row mx-0"}>
                    {shopData.map((item,index)=>
                        <ShopCard key={index} shop={item}/>
                    )}
                </div>

            </div>
        </div>
    );
}

