import './App.scss';
import Header from './components/Header';
import Container from 'react-bootstrap/Container';
import { ToastContainer} from 'react-toastify';
import { useState } from 'react';
import {
  Routes, Route, Link
} from "react-router-dom";
import AppRoutes from './routes/AppRoutes';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext, UserProvider } from './context/UserContext';
import { useContext } from 'react';
import { useEffect } from 'react';

function App() {
  const [keyWord, setKeyWord] = useState("")
  const [ isShowModalAddNew, setIsShowModalAddNew] = useState(false);
  const { user, loginContext } = useContext(UserContext)
  const handleClose = (e) => {
    setIsShowModalAddNew(false);
  }
  
  useEffect(()=> {
    if (localStorage.getItem("token")){
      loginContext(localStorage.getItem("email"), localStorage.getItem("token"))
    }
  },[])
  return (
    <div className="app-container">
      <div>
        <Header/>  
        <Container>
            <AppRoutes></AppRoutes>
        </Container>
        {/* <TableUsers/> */}
        </div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          />
      </div>
  );
}

export default App;
