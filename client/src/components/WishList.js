import React, { useEffect, useState } from "react";
import SideBar from "../components/navBar/SideBar";
import { useAuth } from "../context/auth";
import axios from "axios";
import { Property_API } from "../config/config";
import AdCards from "../components/cards/AdCards";
import { LIKE_UN_LIKE_API } from "../config/config";

const WishList = () => {
    //context
    const [auth, setAuth] = useAuth();

    //state
    const [totalcount, setTotalcount] = useState();
    const [myCard, setMyCard] = useState([]);

    const admin = auth.userResult?.userType?.includes("ADMIN");
    const seller = auth.userResult?.userType?.includes("SELLER");
    const buyer = auth.userResult?.userType?.includes("BUYER");

    // const [page, setPage] = useState(1);
    // const [loding, setLoding] = useState(false);

    useEffect(() => {
        WishList_List();
    }, []);

    const WishList_List = async (e) => {
        // e.preventDefault(); 
        try {
            const { data } = await axios.get(`${LIKE_UN_LIKE_API}/list`, {
                headers: {
                    token: auth.token
                }
            });
            console.log("data testing------------", data.result);
            if (data.result !== undefined) {
                setMyCard(data?.result);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="contaienr-fluid mt-2">
            <SideBar />
            <div className="container">
                <div className="row ">
                    {myCard.map(card => <AdCards card={card} />)}
                </div>
            </div>
            <hr />
            <br/>
        </div>
    );
};

export default WishList;

