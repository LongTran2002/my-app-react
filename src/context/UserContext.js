import React from "react";
const UserContext = React.createContext({name:'', auth:'false'})
const UserProvider = ({ children }) => {
    const [user, setUser] = React.useState({})
}