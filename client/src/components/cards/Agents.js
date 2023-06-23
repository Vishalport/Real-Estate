import React, { useEffect, useState } from 'react'
import { Badge} from 'antd';
import {Property_API} from "../../config/config"
import axios from 'axios';
import dayjs from 'dayjs';


export default function Agents({agent}) {

  const [propertyCount, setPropertyCount] = useState();

    useEffect(()=> {
      totalCount()
    }, [])

    const totalCount = async (e) => {
        // e.preventDefault(); 
        try {
          const { data } = await axios.get(`${Property_API}/countProperty/${agent._id}`);
          if (data.result !== undefined) {
            setPropertyCount(data.result);
          }
        } catch (error) {
          console.log(error);
        }
      };

  return (
    <div className="col-lg-4 p-4">
    {/* <Link to={`/property/edit/${card._id}`}>   */}
        <Badge.Ribbon text={`${agent?.status} For ${agent?.userType}`} color={`${agent?.userType === "SELL" ? "blue" : "green"}`}>
            <div className="card hoverable shadow">
                <img
                    src={agent?.images}
                    alt={`${agent?.firstName ? agent?.firstName : "Agent"}-${agent?.address ? agent?.address : "Not Mention"}`}
                    style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                    <div className="d-block justify-content-between">
                        <h6>Mobile Number{agent?.mobileNumber ? agent?.mobileNumber : "Not Mention"}</h6>
                        <h6>Name : {agent?.firstName ? agent?.firstName : "Not Mention"}</h6>
                        <h6>Email : {agent?.email ? agent?.email : "www@gmail.com"}</h6>
                        <h6>Address : {agent?.address ? agent?.address : "Not Mention"}</h6>
                        <h6 style={{color : "green"}}>Joined : {dayjs(agent.createdAt).fromNow()}</h6>
                        {/* <h6>Totel Property : {propertyCount}</h6> */}
                    </div>
                </div>
            </div>
        </Badge.Ribbon>
    {/* </Link>  */}
</div>
  )
}
