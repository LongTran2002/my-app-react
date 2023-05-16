import './App.scss';
import Header from './components/Header';
import TableUsers from './components/TableUsers';
import Container from 'react-bootstrap/Container';
import ModalAddNew from './components/ModalAddNew';
import { ToastContainer} from 'react-toastify';
import { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [ isShowModalAddNew, setIsShowModalAddNew] = useState(false);
  const handleClose = (e) => {
    setIsShowModalAddNew(false);
  }
  return (
    <div className="app-container">
      <div>
        <Header/>  
        <Container>
          <div className="my-3 add-new">
            <span>List User</span>
            <button className="btn btn-success" 
            onClick={()=>setIsShowModalAddNew(true)}
            >Add new users</button>
          </div>
          <TableUsers/>
        </Container>
        <ModalAddNew
            show={isShowModalAddNew}
            handleClose={handleClose}
          />
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
