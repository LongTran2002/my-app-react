import { useEffect } from 'react';
import { useState } from 'react';
import Table from 'react-bootstrap/Table';
import { fetchAllUsers } from '../services/UsersService';
import ReactPaginate from 'react-paginate';
import ModalEditUser from './ModalEditUser';
import { useStoreUser } from '../services/store-user';
import ModalConfirm from './ModalConfirm';
const TableUsers = () => {
    const listUsers = useStoreUser(store => store.listUsers);
    const setListUsers = useStoreUser(store => store.setListUsers);
    const setDataUserEdit = useStoreUser(store => store.setDataUserEdit);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [isShowModaEditUser, setIsShowModaEditUser] = useState(false);
    const [isShowModaDeleteUser, setIsShowModaDeleteUser] = useState(false);
    const handleClose = (e) => {
        setIsShowModaEditUser(false);
        setIsShowModaDeleteUser(false);
      }
    const handleClickEditUser =(user) => {
        setIsShowModaEditUser(true)
        setDataUserEdit(user)
    }

    const handleClickDeleteUser = (user) => {
        setIsShowModaDeleteUser(true)
        setDataUserEdit(user)
    }
    useEffect(() => {
        getUsers(1)
    }, [])

    const getUsers = async(page) => {
        let res = await fetchAllUsers(page)
        if (res && res.data){
            setListUsers(res.data)
            setTotalUsers(res.total)
            setTotalPages(res.total_pages)

        }
    }

    

    const handlePageClick = (event)=> {
        getUsers(event.selected+1)
    }
    return (
        <>
        
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>ID
                    <i className="fa-solid fa-house"></i>
                    </th>
                    <th>Email</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {listUsers && listUsers.length>0 && 
                listUsers.map((item, index) => {
                    return (
                        <tr key={`user-${index}`}>
                            <td>{item.id}</td>
                            <td>{item.email}</td>
                            <td>{item.first_name}</td>
                            <td>{item.last_name}</td>
                            <td style={{gap: "10px" , display: 'flex'}}>
                                <button className='btn btn-success mr-4' onClick={(e)=>handleClickEditUser(item)}>Edit</button>
                                <button className='btn btn-danger' onClick={(e)=>handleClickDeleteUser(item)}>Delete</button> 
                            </td>
                        </tr>    
                    )})
                }
                </tbody>
                    
            </Table>
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={totalPages}
                previousLabel="< previous"
                pageClassName='page-item'
                pageLinkClassName='page-link'
                previousClassName='page-item'
                previousLinkClassName='page-link'
                nextClassName='page-item'
                nextLinkClassName='page-link'
                breakClassName='page-item'
                breakLinkClassName='page-link'
                containerClassName='pagination'
                activeLinkClassName='active'
            />
            <ModalEditUser 
                show={isShowModaEditUser}
                handleClose={handleClose}
            />

            <ModalConfirm 
                show={isShowModaDeleteUser}
                handleClose={handleClose}
            />
        </>
    );
}

export default TableUsers;