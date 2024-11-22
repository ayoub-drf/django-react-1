import { jwtDecode } from "jwt-decode"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants"
import api from "../api"
import { useState, useEffect } from "react"
import { Navigate } from "react-router-dom"

const ProtectedRoute = ({ children }) => {
    const [isAuthorized, setIsAuthorized] = useState(null)

    const refreshToken = async () => {
        const refreshTokenValue = localStorage.getItem(REFRESH_TOKEN)
        try {
            const res = await api.post("token/refresh/", {
                refresh: refreshTokenValue
            })
            if (res.status == 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                setIsAuthorized(true)

            } else {
                setIsAuthorized(false)
            }

        } catch (err) {
            setIsAuthorized(false)
            console.log(err)
        }
    };

    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN)
        if(!token) {
            setIsAuthorized(false)
            return;
        }

        const timeNow = (Date.now() / 1000);
        const decode = jwtDecode(token)
        const tokenExp = decode.exp;

        if (timeNow > tokenExp) {
            await refreshToken()
        } else {
            console.log("Token Valid")
            setIsAuthorized(true)
        }

    }

    useEffect(() => {
        auth().catch(() => setIsAuthorized(false))
    }, [isAuthorized])

    if (isAuthorized == null) {
        return <div>Loading ...</div>
    }

  return isAuthorized ? children : <Navigate to="/login" />
//   return children
}

export default ProtectedRoute;