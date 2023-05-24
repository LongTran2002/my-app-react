import { useState } from 'react';
import { Modal, Button} from 'react-bootstrap';
import { deleteUser, postCreateUser } from "../services/UsersService"
import { toast } from 'react-toastify';
import { useStoreUser } from '../services/store-user';
import _ from "lodash"


const ModalConfirm = (props) => {
    const dataUserEdit = useStoreUser(store => store.dataUserEdit);
    const listUsers = useStoreUser(store => store.listUsers);
    const setListUsers = useStoreUser(store => store.setListUsers);
    
    const { handleClose, show } = props;
    const confirmDelete = async() => {
        const res = await deleteUser(dataUserEdit.id)
        if (res && +res.statusCode === 204) {
            let cloneListUsers = _.cloneDeep(listUsers)
            cloneListUsers = cloneListUsers.filter(item => item.id !== dataUserEdit.id)
            setListUsers(cloneListUsers)
            toast.success("Delete user success")
        }
        else{
            toast.error("Error delete")
        }
    handleClose()
    }
   
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Delete user ?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                            <div className="mb-3">
                                <label className="form-label">Do you want delete {dataUserEdit.email}</label>
                            </div>
                        
                    </div>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={()=>confirmDelete()}>
                    Confirm
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default ModalConfirm
