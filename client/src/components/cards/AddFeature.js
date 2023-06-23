import React from 'react'
import { IoBedOutline } from "react-icons/io5";
import { TbBath } from "react-icons/tb";
import { BiArea } from "react-icons/bi";
import { BsFillBuildingsFill } from "react-icons/bs";

export default function AddFeature({ card }) {
    return (
        <div>
            <p className="card-text d-flax justify-content-between">
                {/* Bedroom Icon  */}
                {card?.bedrooms ? (
                    <span className="mx-3"><IoBedOutline /> {card?.bedrooms}</span>
                ) : ("NOT Mention")}

                {/* address Icon  */}
                {card?.address ? (
                    <span><BiArea /> {card?.address}</span>
                ) : ("NOT Mention")}

                <hr />
                {/* Bathroom Icon  */}
                {card?.bathrooms ? (
                    <span className='mx-1'><TbBath /> {card?.bathrooms}</span>
                ) : ("NOT Mention")}

                {/* Propery Name  */}
                {card?.name ? (
                    <span className="mx-1">Property Name : {card?.name}</span>
                ) : ("NOT Mention")}

                {/* floor Icon  */}
                {card?.floor ? (
                    <span className="mx-1"><BsFillBuildingsFill /> {card?.floor}</span>
                ) : ("NOT Mention")}
            </p>
        </div>
    )
}
