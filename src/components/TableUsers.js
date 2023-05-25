import { useEffect } from 'react';
import { useState } from 'react';
import Table from 'react-bootstrap/Table';
import { fetchAllUsers } from '../services/UsersService';
import ReactPaginate from 'react-paginate';
import ModalEditUser from './ModalEditUser';
import { useStoreUser } from '../services/store-user';
import ModalConfirm from './ModalConfirm';
import _, { set } from "lodash";
import { CSVLink, CSVDownload } from "react-csv";
import "./TableUser.sass"
import Papa from "papaparse"
import { toast } from 'react-toastify';
const TableUsers = () => {
    const listUsers = useStoreUser(store => store.listUsers);
    const setListUsers = useStoreUser(store => store.setListUsers);
    const setDataUserEdit = useStoreUser(store => store.setDataUserEdit);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [isShowModaEditUser, setIsShowModaEditUser] = useState(false);
    const [isShowModaDeleteUser, setIsShowModaDeleteUser] = useState(false);
    const [sortBy, setSortBy] = useState("asc");
    const [sortField, setSortField] = useState("id")
    const [dataExport, setDataExport] = useState([])
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

    const handleSort = (sortBy, sortField) => {
        setSortBy(sortBy);
        setSortField(sortField);
        let cloneListUsers = _.cloneDeep(listUsers);
        cloneListUsers = _.orderBy(cloneListUsers, [sortField], [sortBy])
        console.log(cloneListUsers);
    }
    

    const handlePageClick = (event)=> {
        getUsers(event.selected+1)
    }
    const handleSearch = (e) => {
        let term = e.target.value;
        if (term) {
            let cloneListUsers = _.cloneDeep(listUsers)
            cloneListUsers = cloneListUsers.filter(item => item.email.includes(term))
            setListUsers(cloneListUsers)
        }
        else {
            getUsers(1)
        }
      }
  
      const getUsersExport = (event, done) => {
        let result = []
        if (listUsers && listUsers.length > 0){
            result.push(["id","email","First name","Last name"])
            listUsers.map(item => {
                let arr =[]
                arr[0] = item.id;
                arr[1] = item.email;
                arr[2] = item.first_name;
                arr[3] = item.last_name;
                result.push(arr);
            })
        }
        setDataExport(result)
        done()
      }

      const handleImportCSV =(e) => {
        if (e.target  && e.target.files && e.target.files[0]){
            let file = e.target.files[0];
            if (file.type !== "text/csv") {
                toast.error(`Only CSV files are supported`)
                return;
            }
        }
        Papa.parse(file, {
            complete: function (result) {
                let rawCSV = result.data;
                if (rawCSV.length > 0) {

                }
                else{
                    toast.error(`Not found data on csv file`)
                }
            }
        })
      }
    return (
        <>
            <div className='col-6 my-3'>
                <div className='interact-table'>
                    <input 
                    className='form-control' 
                    placeholder='Search user email...'
                    // value={keyWord}
                    onChange={(e)=>handleSearch(e)}>
                    </input>
                    <label htmlFor='test' className='btn btn-warning'>Import</label>
                    <input id="test" type='file' hidden onChange={(e)=> handleImportCSV(e)}></input>
                    
                    <CSVLink 
                        data={dataExport}
                        className='btn btn-primary'
                        target='_blank'
                        filename={"users.csv"}
                        asyncOnClick={true}
                        onClick={(event, done) => getUsersExport(event, done)}
                    >Export</CSVLink>;
                </div>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>
                            <div className='sort-header'>
                                <span>ID</span>
                                <span>
                                    <i className="fa-solid fa-arrow-down-long" onClick={()=>handleSort("desc", "id")}></i>
                                    <i className="fa-solid fa-arrow-up-long" onClick={()=>handleSort("asc", "id")}></i>
                                </span>
                            </div>
                        </th>
                        <th>Email</th>
                        <th>
                            <div className='sort-header'>
                                <span>First name</span> 
                                <span>
                                    <i className="fa-solid fa-arrow-down-long" onClick={()=>handleSort("desc", "first_name")}></i>
                                    <i className="fa-solid fa-arrow-up-long" onClick={()=>handleSort("asc", "first_name")}></i>
                                </span>
                            </div>
                        </th>
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