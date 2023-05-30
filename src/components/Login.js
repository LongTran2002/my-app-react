import { useState } from "react"
import { loginApi } from "../services/UsersService"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { redirect } from "react-router-dom";
import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import { Link } from "react-router-dom"
const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isShowPassword, setIsShowPassword] = useState(false)
    const { loginContext } = useContext(UserContext)
    
    // useEffect(()=> {
    //     let token = localStorage.getItem("token")
    //     console.log(token);
    //     if (token){
    //     navigate("/");
    //     console.log("REnder");

    //     }
        
    // },[])
    const navigate = useNavigate();

    const handleLogin = async() => {
        if(!email || !password){
            toast.error("Please, sign email and password")
            return;
        }
        let res = await loginApi("eve.holt@reqres.in", password);
        if (res && res.token) {
            loginContext(email, res.token)
            navigate("/");
        }
    }
    const handleGoBack = () => {
        
    }
    return(
        <>
            <div className="login-container col-12 col-sm-4">
                <div className="title">Login</div>
                <div className="text">Email or user</div>
                <input type="text" placeholder="Email or username..."
                value={email}
                onChange={(event)=> setEmail(event.target.value)}
                >
                </input>
                <div className="input-2">
                    <input type={isShowPassword === true ? "text" : "password"}
                    placeholder="Password..." 
                    value={password}
                    onChange={(event)=>setPassword(event.target.value)}>
                    </input>
                    <i className={isShowPassword === true ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}
                        onClick={()=>setIsShowPassword(!isShowPassword)}></i>
                </div>
                <button className={email && password ? "active" : ""}
                        disabled={email && password ? false : true}
                        onClick={()=>handleLogin()}
                >Login</button>
                <div className="back">
                    <i className="fa-solid fa-angles-left"></i>
                    <Link to="/" relative="path">
                        <span onClick={()=> handleGoBack()}></span>
                    Back
                    </Link>
                </div>
            </div>

             
        </>
    )
}
export default Login
