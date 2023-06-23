import React, { useState } from 'react'
import axios from 'axios';
import Toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { API } from "../../config/config"
import {UploadFile_API} from "../../config/config"

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [images, setImages] = useState("");
    const [userType, setUserType] = useState("");

    const navigate = useNavigate();

    const [loading, setReload] = useState(false);


const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        setReload(true)
        const res = await axios.post(`${API}/register`, { email, password, firstName, lastName, mobileNumber, images, confirmPassword, userType })
        console.log(res);

        if (res?.error) {
            Toast.error(res.error);
            setReload(false)
            console.log(res.error)
        }
        else {
            Toast.success(res.data.responseMessage)
            setReload(false);
            navigate("/verify-otp")
        }
    } catch (error) {
        console.log(error);
        Toast.error(error.response.data.responseMessage)
        setReload(false);
    }
}

const uploadSingleFile = async (event) => {
    event.preventDefault();
    const photoObj = event.target.files;
    try {
        const CloudImg = await axios.post(`${UploadFile_API}/uploadSingleFiles`, event.target.files);
        console.log("-------------", CloudImg.data.result);
        setImages(CloudImg.data.result)
        Toast.success("Image Uploded Success");
    } catch (error) {
        console.log(error);
        Toast.error("Something went Worng.");
    }
};

return (
    <div>
        <div className='container'>
            <h1 className='col-lg-4 offset-lg-4 p-1'>Register Page</h1>
            <div className='row'>
                <div className='col-lg-4 offset-lg-4'>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text" placeholder='Type firstName' className='form-control mb-4' required autoFocus
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <input
                            type="text" placeholder='Type lastName' className='form-control mb-4' required autoFocus
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        <input
                            type="text" placeholder='userType [BUYER SELLER]' className='form-control mb-4' required autoFocus
                            value={userType}
                            onChange={(e) => setUserType(e.target.value)}
                        />
                        <input
                            type="text" placeholder='Type Email' className='form-control mb-4' required autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password" placeholder='Type Password' className='form-control mb-4' required autoFocus
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <input
                            type="password" placeholder='Type confirmPassword' className='form-control mb-4' required autoFocus
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <input
                            type="text" placeholder='Type mobileNumber' className='form-control mb-4' required autoFocus
                            value={mobileNumber}
                            onChange={(e) => setMobileNumber(e.target.value)}
                        />
                        <input type="file" placeholder='profile Picture' className='form-control mb-4'
                            onChange={uploadSingleFile} />
                        <input type="text" placeholder='Refrence (Optional)' className='form-control mb-4' required autoFocus />
                        <button disabled={loading} className='btn col-12 mb-4'>{loading ? "Watting.." : "Register"}</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
)

}

