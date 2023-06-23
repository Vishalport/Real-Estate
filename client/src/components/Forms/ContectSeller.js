import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/auth";
import axios from "axios";
import Toast from "react-hot-toast";
export default function ContectSeller({ card }) {
    // context
    const [auth, setAuth] = useAuth();

    //state
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");

    const [loading, setloading] = useState(false);
    const navigate = useNavigate();

    const checkLoginIn = auth.userResult !== null && auth.token !== "";
    const params = useParams();

    useEffect(() => {
        if (checkLoginIn) {
            setName(auth.userResult.firstName);
            setEmail(auth.userResult.email);
            setMobileNumber(auth.userResult.mobileNumber);
        }
    }, [checkLoginIn]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setloading(true);
        try {
            const { data } = axios.post(`sendMessageToSeller/${params._id}`, {
                name,
                email,
                mobileNumber,
                message,
            }, {
                headers: {
                    token: auth.token
                },
            });

            console.log("----------------data -------------------", { data });
            if (data?.error) {
                Toast.error(data?.error);
                loading(false);
            } else {
                Toast.success("Thank You.");
                setloading(false);
            }
        } catch (error) {
            console.log(error);
            Toast.error("Something went Worng");
        }
    };
    return (
        <div className="row">
            <div className="col-lg-8 offset-lg-2">
                <h3>
                    Contact Owner : {""}{" "}
                    {card?.userId?.firstName ? card?.userId?.firstName : "SELLER"}{" "}
                    {card?.userId?.lastName ? card?.userId?.lastName : ""}
                </h3>

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className="form-control mb-3"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        // autoFocus={true} 
                        disabled={!checkLoginIn}
                    ></input>

                    <input
                        type="text"
                        className="form-control mb-3"
                        placeholder="Enter your email"
                        value={email}
                        disabled={!checkLoginIn}
                        onChange={(e) => setEmail(e.target.value)}
                    ></input>

                    <input
                        type="Number"
                        disabled={!checkLoginIn}
                        className="form-control mb-3"
                        placeholder="Enter your Mobile Number"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                    ></input>

                    <textarea
                        name="message"
                        disabled={!checkLoginIn}
                        className="form-control mb-3"
                        placeholder="Write your messages"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    ></textarea>

                    <button className="btn btn-primary" disabled={!checkLoginIn}>
                        {/* disabled={!name || !email || !loading} */}
                        {checkLoginIn
                            ? loading
                                ? "Please wait"
                                : "Sent Enquiry"
                            : "Login for Enquiry"}
                    </button>
                </form>
            </div>
        </div>
    );
}
