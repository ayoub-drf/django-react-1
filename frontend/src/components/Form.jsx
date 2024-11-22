import { useState } from "react";
import "../styles/Form.css";
import { PropTypes  } from "prop-types";
import api from "../api";
import { useNavigate } from "react-router-dom"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import Loader from "./Loader"


const Form = ( {route, method} ) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()


  const name = method == "login" ? "Login" : "Register";
  const handleChange = (e) => {
    const {value, name} = e.target

    if (name == "username") {
      setUsername(value)
    } else {
      setPassword(value)
    }
  };

  // useEffect(() => {
  //   console.log('Hello')
  //   if (valid) {

  //   }
    
  // }, [valid])




  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(!loading);

    try {
      const res = await api.post(route, {username, password})
      localStorage.setItem(ACCESS_TOKEN, res.data.access);
      localStorage.setItem(REFRESH_TOKEN, res.data.refresh);

      if (method == "login") {
        navigate("/")
      } else {
        navigate('/login')
      }
      
    } catch(err) {
      setError(err)
      console.log(error)
    } finally {
      setUsername("")
      setPassword("")
      setLoading(false)
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
        <h1>{name}</h1>
        <input type="text" required={true} name="username" value={username} onChange={(e) => handleChange(e)} className="form-input" placeholder="Username" />
        <input type="password" required={true} name="password" value={password} onChange={(e) => handleChange(e)} className="form-input" placeholder="Password" />
        {loading ? <Loader /> : null}
        <button className="form-button"  type="submit">{name}</button>
    </form>
  )
}


Form.propTypes = {
  route: PropTypes.string.isRequired,
  method: PropTypes.string,
};

export default Form;