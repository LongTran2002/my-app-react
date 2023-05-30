import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logoApp from '../assets/img/logo192.png'
import Home from './Home'
import { useNavigate } from 'react-router-dom';
import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useEffect } from 'react';
const Header = () => {
    const { logout, user } = useContext(UserContext)
    const { hideHeader, setHideHeader} = useState(false)

    const navigate = useNavigate()
    const handleLogout = () => {
        logout()
        navigate("/")
        toast.success("Logout success")
    }
    console.log(user);
    return(
        <>
             <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/">
                        <img 
                            src={logoApp}
                            width="30"
                            height="30"
                        />
                        My App
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        {(user && user.auth || window.location.pathname === '/') && 
                            <>
                                <Nav className="me-auto">
                                    <Nav.Link href="/" className='nav-link'>Home</Nav.Link>
                                    <Nav.Link href="/users" className='nav-link'>Manage Users</Nav.Link>
                                </Nav>
                                <Nav>
                                    {user && user.email && <span className='nav-link'>Welcome {user.email}</span>}
                                    <NavDropdown title="Setting" id="basic-nav-dropdown">
                                        {user && user.auth === true
                                        ? <NavDropdown.Item onClick={()=> handleLogout()}>Logout</NavDropdown.Item> 
                                        :<NavDropdown.Item href='/login' className='dropdown-item'>Login</NavDropdown.Item>
                                        }
                                    </NavDropdown>
                                </Nav>
                            </>
                        }
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Header;