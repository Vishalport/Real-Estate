import { useState, createContext, useContext, useEffect } from "react";
import axios from "axios";
import { API } from "../config/config";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        userResult: null,
        token: "",
        refreshToken: ""
    });

    useEffect(() => {
        let localData = (JSON.parse(localStorage.getItem("auth")))
        if (localData) {
            setAuth(localData)
        }
    }, [auth?.token])

    axios.defaults.baseURL = API;
    // axios.defaults.headers.common["token"] = auth?.token;
    // axios.defaults.headers.common["refresh_token"] = auth?.refreshToken;

    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => useContext(AuthContext)
export { useAuth, AuthProvider };
