import { Route, Routes } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
const PrivateRoute = (props) => {
    const { user } = useContext(UserContext)
    if (user && !user.auth){
        return <>
            You don't have permission for this action
        </>
    }
    const pathName = props.children.props.path
    return (
        <>
            {props.children}
        </>
    )
}
export default PrivateRoute