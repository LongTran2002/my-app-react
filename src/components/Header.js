import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logoApp from '../assets/img/logo192.png'
import Home from './Home'
import { useNavigate } from 'react-router-dom';
const Header = () => {
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem("token")
        navigate("/")
    }
    return(
        <>
             <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/home">
                        <img 
                            src={logoApp}
                            width="30"
                            height="30"
                        />
                        My App
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/" className='nav-link'>Home</Nav.Link>
                            <Nav.Link href="/users" className='nav-link'>Manage Users</Nav.Link>
                        </Nav>
                        <Nav>
                            <NavDropdown title="Setting" id="basic-nav-dropdown">
                                <NavDropdown.Item href='/login' className='dropdown-item'>Login</NavDropdown.Item>
                                <NavDropdown.Item onClick={()=> handleLogout()}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Header;