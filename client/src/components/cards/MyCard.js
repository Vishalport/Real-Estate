import React from "react";
import { Badge, ColorPicker } from 'antd';
import { Link } from "react-router-dom";
import AddFeature from "./AddFeature";
import { NumberFormate } from "../../helpers/number";

export default function MyCard({card}) {
    return (
        <div className="col-lg-4 p-4">
            <Link to={`/property/edit/${card._id}`}> 
                <Badge.Ribbon text={`${card?.type} For ${card?.action}`} color={`${card?.action === "SELL" ? "blue" : "green"}`}>
                    <div className="card hoverable shadow">
                        <img
                            src={card?.images}
                            alt={`${card?.type}-${card?.address}-${card?.action}-${card?.price}`}
                            style={{ height: "200px", objectFit: "cover" }}
                        />
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <h3>$ {card?.price}</h3>
                            </div>
                            <AddFeature card={card} />
                        </div>
                    </div>
                </Badge.Ribbon>
            </Link> 
        </div>
    );
}

