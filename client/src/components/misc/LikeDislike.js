import React, { useState } from 'react'
import { FcLike, FcLikePlaceholder } from "react-icons/fc"
import { useParams } from 'react-router-dom'
import { LIKE_UN_LIKE_API } from '../../config/config';
import axios from 'axios';
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth'

export default function LikeDislike({ card }) {
    // contex
    const [auth, setAuth] = useAuth();

    const[WishList, setWishlist] = useState(false);
    const params = useParams();
    const Navigate = useNavigate();

    const handleLike = async ({ card }) => {
        setWishlist(true);
        try {
            if (auth.userResult === null) {
                toast.error("Loing Please.");
                Navigate("/login");
                return;
            }
             const {data} = await axios.post(`${LIKE_UN_LIKE_API}/addWishList/${params._id}`, {},
                {
                    headers: {
                        token: auth.token
                    }
                });

            toast.success("Liked Success");
        } catch (error) {
            console.log(error);
            toast.error("Something went Worng.");
        }
    };

    const handleUnlike = async () => {
        setWishlist(false);
        try {
            if (auth.userResult === null) {
                toast.error("Loing Please.");
                Navigate("/login");
                return;
            }
            await axios.post(`${LIKE_UN_LIKE_API}/removeWishList/${params._id}`, {},
                {
                    headers: {
                        token: auth.token
                    }
                });
            toast.success("unLiked Success");
        } catch (error) {
            console.log(error);
            toast.error("Something went Worng.");
        }
    };
    return (

        <>
            { WishList ?
               (<span><FcLikePlaceholder onClick={handleUnlike} className='h3 pointer' /></span> )
                : (<span><FcLike onClick={handleLike} className='h3 pointer' /></span>)
            }

        </>
    );


} 
