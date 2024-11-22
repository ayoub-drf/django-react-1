import { jwtDecode } from "jwt-decode"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants"
import api from "../api"

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem(ACCESS_TOKEN)
    const tokenExp = jwtDecode(token).exp
    const dateNow = Math.floor(Date.now() / 1000)

    console.log((dateNow - tokenExp) / 3600)

    const refreshToken = async () => {
        const refreshTokenValue = localStorage.getItem(REFRESH_TOKEN)
        try {
            const res = await api.post("token/refresh/", {
                refresh: refreshTokenValue
            })
            console.log(res.data)
        } catch (err) {
            console.log(err)
        }
    };

    


  return children
}

export default ProtectedRoute;