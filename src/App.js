import './App.scss';
import Header from './components/Header';
import TableUsers from './components/TableUsers';
import Container from 'react-bootstrap/Container';
import { ToastContainer} from 'react-toastify';
import { useState } from 'react';
import {
  Routes, Route, Link
} from "react-router-dom";

import 'react-toastify/dist/ReactToastify.css';
import Home from './components/Home';
import Login from './components/Login';

function App() {
  const [keyWord, setKeyWord] = useState("")
  const [ isShowModalAddNew, setIsShowModalAddNew] = useState(false);
  const handleClose = (e) => {
    setIsShowModalAddNew(false);
  }
  

  return (
    <div className="app-container">
      <div>
        <Header/>  
        <Container>
          <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/users' element={<TableUsers/>}></Route>
            <Route path='/login' element={<Login/>}></Route>

          </Routes>
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
